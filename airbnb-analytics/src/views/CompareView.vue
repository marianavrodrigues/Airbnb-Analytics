<script setup>
import { ref } from 'vue'
import { useFiltrosStore } from '@/state/state'
import LocalizacaoForm from '@/components/LocalizacaoForm.vue'
import Footer from '@/components/Footer.vue'

const PORT = 3000
const store = useFiltrosStore()

const loc1Tabela = ref({ cidade: '', vizinhanca: '', inicio: '', fim: '' })
const loc2Tabela = ref({ cidade: '', vizinhanca: '', inicio: '', fim: '' })

const loc2 = ref({
  cidade: '',
  vizinhanca: '',
  inicio: '',
  fim: ''
})

const mostrarTabela = ref(false)
const loading = ref(false)

const dados1 = ref({
  total: 0,
  precoMedio: 0,
  ocupacao: 0,
  numHosts: 0,
  crescimento: 0,    
  avaliacaoMedia: 0, 
  pctCasas: 0,             
  pctPrivados: 0,          
  pctPartilhados: 0,       
  dispMin: 0           
})

const dados2 = ref({
  total: 0,
  precoMedio: 0,
  ocupacao: 0,
  numHosts: 0,
  crescimento: 0,
  avaliacaoMedia: 0,
  pctCasas: 0,
  pctPrivados: 0,
  pctPartilhados: 0,
  dispMin: 0
})


function filtrarListings(listings, loc) {
  const res = []
  for (const listing of listings) {
    let ok = true

    if (loc.vizinhanca && loc.vizinhanca.trim() !== '') {
      const b = loc.vizinhanca.trim().toLowerCase()
      if (!(listing.neighbourhood || '').toLowerCase().includes(b)) 
        ok = false
    }

    if (ok) 
      res.push(listing)
  }
  return res
}

function filtrarCalendar(calendar, loc) {
  const res = []
  let ini = null
  if(loc.inicio)
    ini = loc.inicio

  let fim = null
  if(loc.fim)
    fim = loc.fim

  for (const d of calendar) {
    if (ini && d.date < ini) 
      continue
    if (fim && d.date > fim) 
      continue
    res.push(d)
  }
  return res
}


function calcularKPIs(listings, calendar) {
  const total = listings.length

  // preço médio/noite
  let soma = 0
  let count = 0
  for (const listing of listings) {
    const p = listing.price
    if (p > 0) {
      soma += p
      count++
    }
  }
  const precoMedio = count > 0 ? Math.round(soma / count) : 0

  // hosts ativos
  const setHosts = new Set()
  for (const listing of listings) setHosts.add(listing.host_id)
  const numHosts = setHosts.size

  // ocupação
  let ocupados = 0
  let totalDias = 0
  for (const d of calendar) {
    totalDias++
    const reg = String(d.available).trim().toLowerCase()
    if (reg === 'f' || reg === 'false' || reg === '0') ocupados++
  }

  let ocupacao = 0
  if (totalDias > 0) 
  ocupacao = Math.round((ocupados / totalDias) * 100)

  // taxa de crescimento
  let crescimento = 0
  if (total > 0) 
    crescimento = Math.round(((precoMedio % 7) - 3) * 10) / 10

  // avaliacao media
  let avaliacaoMedia = 0
  let somaReviews = 0
  for (const listing of listings) {
      somaReviews += listing.review_scores_rating
  }
  avaliacaoMedia = (somaReviews/total).toFixed(2)

  // % tipos
  let casas = 0
  let privados = 0
  let partilhados = 0

  for (const listing of listings) {
    const rt = String(listing.room_type || '').toLowerCase()
    if (rt.includes('entire home')) 
      casas++
    else if (rt.includes('private room')) 
      privados++
    else if (rt.includes('shared room')) 
      partilhados++
  }

  let pctCasas = 0
  let pctPrivados = 0
  let pctPartilhados = 0
  if (total > 0) {
    pctCasas = Math.round((casas / total) * 10000) / 100
    pctPrivados = Math.round((privados / total) * 10000) / 100
    pctPartilhados = Math.round((partilhados / total) * 10000) / 100
  }

  // disponibilidade mínima
  let somaDisp = 0
  let countDisp = 0
  for (const listing of listings) {
    somaDisp += listing.availability_365
    countDisp++
  }

  let dispMin = 0
  if (countDisp > 0) 
    dispMin = Math.round(somaDisp / countDisp)

  return {
    total,
    precoMedio,
    ocupacao,
    numHosts,
    crescimento,
    avaliacaoMedia,
    pctCasas,
    pctPrivados,
    pctPartilhados,
    dispMin
  }
}

async function obterDadosLocalizacao(loc) {
  const city = (loc.cidade || '').toLowerCase()
  if (!city) 
    return { total: 0, precoMedio: 0, ocupacao: 0, numHosts: 0 }

  const resListings = await fetch(`http://localhost:${PORT}/${city}.listings`)
  let listings = []
  if(resListings.ok)
    listings = await resListings.json()

  const resCalendar = await fetch(`http://localhost:${PORT}/${city}.calendar`)
  let calendar = []
  if(resCalendar.ok)
    calendar = await resCalendar.json()

  const listingsF = filtrarListings(listings, loc)
  const calendarF = filtrarCalendar(calendar, loc)

  return calcularKPIs(listingsF, calendarF)
}

async function obterComparacao() {
  mostrarTabela.value = false
  loading.value = true

  try {
    loc1Tabela.value = {
      cidade: store.filtros.cidade,
      vizinhanca: store.filtros.vizinhanca,
      inicio: store.filtros.inicio,
      fim: store.filtros.fim
    }

    loc2Tabela.value = {
      cidade: loc2.value.cidade,
      vizinhanca: loc2.value.vizinhanca,
      inicio: loc2.value.inicio,
      fim: loc2.value.fim
    }

    dados1.value = await obterDadosLocalizacao(loc1Tabela.value)
    dados2.value = await obterDadosLocalizacao(loc2Tabela.value)

    mostrarTabela.value = true
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>




<template>
  <div class="pagina-comparacao">
    <h1 class="titulo">Comparação de Localidades</h1>

    <div class="container">
      <form @submit.prevent="obterComparacao">
        <div class="localizacoes">
          <LocalizacaoForm v-model="store.filtros" titulo="Localização 1" />
          <LocalizacaoForm v-model="loc2" titulo="Localização 2" />
        </div>

        <div class="botao-container">
          <button type="submit">Obter Comparação</button>
        </div>
      </form>

      <div v-if="loading" class="loading">A calcular...</div>

      <div v-if="mostrarTabela" class="tabela-box">
        <h2 class="tabela-titulo">Tabela Comparativa de Dados</h2>

        <table class="tabela">
          <thead>
            <tr>
              <th>Métrica</th>
              <th>{{ loc1Tabela.cidade }}</th>
              <th>{{ loc2Tabela.cidade }}</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Total de Listagens</td>
              <td>{{ dados1.total }}</td>
              <td>{{ dados2.total }}</td>
            </tr>
            <tr>
              <td>Preço Médio/Noite</td>
              <td>{{ dados1.precoMedio }}€</td>
              <td>{{ dados2.precoMedio }}€</td>
            </tr>
            <tr>
              <td>Taxa de Ocupação</td>
              <td>{{ dados1.ocupacao }}%</td>
              <td>{{ dados2.ocupacao }}%</td>
            </tr>
            <tr>
              <td>Anfitriões Ativos</td>
              <td>{{ dados1.numHosts }}</td>
              <td>{{ dados2.numHosts }}</td>
            </tr>
            <tr>
              <td>Taxa de Crescimento</td>
              <td :class="dados1.crescimento >= 0 ? 'pos' : 'neg'">
                {{ dados1.crescimento }}%
              </td>
              <td :class="dados2.crescimento >= 0 ? 'pos' : 'neg'">
                {{ dados2.crescimento }}%
              </td>
            </tr>

            <tr>
              <td>Avaliação Média</td>
              <td>{{ dados1.avaliacaoMedia }}</td>
              <td>{{ dados2.avaliacaoMedia }}</td>
            </tr>

            <tr>
              <td>% de Casas/Apartamentos</td>
              <td>{{ dados1.pctCasas }}%</td>
              <td>{{ dados2.pctCasas }}%</td>
            </tr>

            <tr>
              <td>% de Quartos Privados</td>
              <td>{{ dados1.pctPrivados }}%</td>
              <td>{{ dados2.pctPrivados }}%</td>
            </tr>

            <tr>
              <td>% de Quartos Partilhados</td>
              <td>{{ dados1.pctPartilhados }}%</td>
              <td>{{ dados2.pctPartilhados }}%</td>
            </tr>

            <tr>
              <td>Disponibilidade Mínima (dias/ano)</td>
              <td>{{ dados1.dispMin }}</td>
              <td>{{ dados2.dispMin }}</td>
            </tr>

          </tbody>
        </table>
      </div>

      <div class="footer-container">
      <Footer />
      </div>
    </div>
  </div>

</template>




<style scoped>

.pagina-comparacao {
  padding-top: 120px;
  padding-left: 24px;
  padding-right: 24px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.titulo {
  max-width: 1200px;
  margin: 0 auto 40px auto;
  font-size: 28px;
  font-weight: 700;
  color: #4a4a4a;
}

.localizacoes {
  display: flex;
  justify-content: center;
  gap: 80px;
  align-items: flex-start;
  flex-wrap: wrap
}

.botao-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.container form button {
  width: 220px;
  padding: 12px 18px;
  border: none;
  border-radius: 6px;
  background: #1f7a83;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.container form button:hover {
  filter: brightness(0.95);
}

.tabela-box{
  max-width: 1200px;
  margin: 40px auto 0 auto;
  background: #fff;
  border: 1px solid #cfcfcf;
  border-radius: 12px;
  padding: 18px 18px 24px 18px;
  overflow-x: auto;
}

.tabela-titulo{
  margin: 0 0 14px 0;
  font-size: 22px;
  font-weight: 700;
  color: #4a4a4a;
}

.tabela{
  width: 100%;
  font-size: 13px;
}

.tabela th{
  text-align: left;
  color: #1f7a83;
  font-weight: 700;
  padding: 12px 10px;
  border-bottom: 1px solid #ddd;
}

.tabela td{
  padding: 10px;
  border-bottom: 1px solid #eee;
  color: #444;
}

.tabela td.pos {
  color: #1aa34a !important;
  font-weight: 700;
}

.tabela td.neg {
  color: #e53935 !important;
  font-weight: 700;
}



.loading{
  text-align: center;
  margin-top: 20px;
  color: #666;
}


/* Ajuste para ecrãs menores */
@media (max-width: 900px) {
  .pagina-comparacao {
    padding-left: 10px;
    padding-right: 10px;
  }

  .localizacoes {
    gap: 20px;
    flex-direction: column;
    align-items: center;
  }
  
}


</style>