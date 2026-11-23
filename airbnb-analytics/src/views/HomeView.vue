<script setup>
    import casapng from '@/assets/images/icons_elementos/casa.png';
    import graficopng from '@/assets/images/icons_elementos/grafico.png';
    import calendariopng from '@/assets/images/icons_elementos/calendario.png';
    import datasetspng from '@/assets/images/icons_elementos/datasets.png';
    import ajudapng from '@/assets/images/ajuda.png';
    import Card from '@/components/Card.vue';
    import lisboajpg from '@/assets/images/cidades/lisboa.jpg'
    import portojpg from '@/assets/images/cidades/porto.jpg'
    import madridjpg from '@/assets/images/cidades/madrid.jpg'
    import Footer from '@/components/Footer.vue'

    import { ref, onMounted } from 'vue'
    import { useFiltrosStore } from '@/state/state'
    import { useRouter } from 'vue-router'


    const PORT = 3000
    const store = useFiltrosStore()

    const cidadesDestaque = ref([
        { nome: 'Lisboa', pais: 'Portugal', img: lisboajpg, cityKey: 'lisboa', listagens: '—', preco: '—' },
        { nome: 'Porto', pais: 'Portugal', img: portojpg, cityKey: 'porto', listagens: '—', preco: '—' },
        { nome: 'Madrid', pais: 'Espanha', img: madridjpg, cityKey: 'madrid', listagens: '—', preco: '—' }
    ])

    async function obterKPIsCidade(cityKey) {
        const resL = await fetch(`http://localhost:${PORT}/${cityKey}.listings`)
        let listings = []
        if(resL.ok){
            listings = await resL.json()
        }

        const total = listings.length

        let soma = 0
        let count = 0
        for (const listing of listings) {
            if (listing.price > 0) {
            soma += listing.price
            count++
            }
        }
        const precoMedio = count ? Math.round(soma / count) : 0

        return { total, precoMedio }
    }

    async function carregarDestaques() {
        for (const c of cidadesDestaque.value) {
            const kpi = await obterKPIsCidade(c.cityKey)
            c.listagens = kpi.total
            c.preco = `${kpi.precoMedio.toLocaleString('pt-PT')}€/noite`
        }
    }

    const router = useRouter()

    function abrirEstatisticas(c) {
        store.limparFiltro()
        store.filtros.cidade = c.nome  

        router.push('/estatisticas')
    }

    onMounted(carregarDestaques)

</script>

<template>
    <section id="hero">
        <h1>O Impacto do Airbnb<br>nas Comunidades Residenciais no Mundo</h1>
    </section>

    <div id="pagina-principal">

      <div id="cards">
        <Card>
            <template #header>Cidades Monitorizadas</template>
            <template #icon><img :src="casapng" class="img-card" alt="icon"></template>
            <h1>200+ Cidades</h1>
        </Card>
        <Card>
            <template #header>Atualização de Dados</template>
            <template #icon><img :src="graficopng" class="img-card" alt="icon"></template>
            <h1>3 em 3 meses</h1>
        </Card>
        <Card>
            <template #header>Anos de Histórico</template>
            <template #icon><img :src="calendariopng" class="img-card" alt="icon"></template>
            <h1>desde 2015</h1>
        </Card>
        <Card>
            <template #header>Datasets Disponíveis</template>
            <template #icon><img :src="datasetspng" class="img-card" alt="icon"></template>
            <ul class="lista-customizada">
                <li v-for="item in ['Listagens', 'Reviews', 'Vizinhança', 'Calendário']" :key="item">
                    {{ item }}
                </li>
            </ul>
            <template #footer><small style="color: #888">Atualizado recentemente</small></template>
        </Card>
      </div>

      <section class="destaques">
        <div class="destaques-top">
            <div class="destaques-titulos">
            <h2>Cidades em Destaque</h2>
            <p>Explore dados detalhados das cidades mais pesquisadas na nossa plataforma</p>
            </div>
        </div>

        <div class="destaques-grid">
            <article v-for="c in cidadesDestaque" :key="c.nome" class="cidade-card" @click="abrirEstatisticas(c)">
                <div class="cidade-img">
                    <img :src="c.img" :alt="`Imagem de ${c.nome}`" />
                    <div class="cidade-overlay">
                        <div class="cidade-nome">{{ c.nome }}</div>
                        <div class="cidade-pais">{{ c.pais }}</div>
                    </div>
                </div>

                <div class="cidade-info">
                    <div class="kpi">
                    <span class="kpi-label">Listagens</span>
                    <span class="kpi-value">{{ c.listagens }}</span>
                    </div>

                    <div class="kpi">
                    <span class="kpi-label">Preço Médio</span>
                    <span class="kpi-value">{{ c.preco }}</span>
                    </div>
                </div>
            </article>
        </div>
        </section>


      <div id="pesquisa">
        <h3>Pesquisa por cidade/área</h3>
        <p>Selecione uma cidade para visualizar dados detalhados sobre o impacto do Airbnb</p>
        <a href="/estatisticas" class="botao">Começar Pesquisa</a>
      </div>

      <div class="footer-container">
        <Footer />
      </div>
    </div>
</template>
  
<style scoped>
#hero {
    text-align: center;
    background: linear-gradient(to bottom, #2d6e72 0%, #255e63 100%);
    color: white;
    padding: 40px 20px;

    position: fixed; 
    top: 80px;
    left: 0;
    width: 100%;
    z-index: 900;
    box-sizing: border-box;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

#hero h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.3;
}

#pagina-principal {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 320px; 
}

#cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem; 
  justify-content: center;
  width: 90%;
  max-width: 1400px;
  margin: 3rem 0;
}

.lista-customizada {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.lista-customizada li {
    font-size: 0.95rem;
    color: #555;
    padding-left: 0.5rem;
    border-left: 3px solid #CEE6EA;
}

#pesquisa {
    width: 100%;
    background-color: #FAFAFA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem 1rem;
    text-align: center;
}

#pesquisa h3 {
    color: #404040;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
}

#pesquisa p {
    font-size: 1.1rem;
    color: #777;
    margin-bottom: 2rem;
    max-width: 600px;
}

.botao {
    width: 100%;
    max-width: 340px;
    height: 50px;
    font-size: 1.2rem;
    font-weight: 500;
    border: 0px;
    border-radius: 8px;
    background-color: #2d6e72;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    transition: background-color 0.3s ease;
    cursor: pointer;
}

.botao:hover {
    background-color: #255e63;
}

#footer {
    width: 90%;
    max-width: 1400px;
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0;
}


@media (max-width: 768px) {
    #hero h1 { font-size: 1.8rem; }
    #cards { width: 95%; margin: 2rem 0; }
    .botao { width: 90%; }

    #pagina-principal { margin-top: 280px; }
}

.destaques {
  width: 90%;
  max-width: 1400px;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.destaques-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.destaques-titulos h2 {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  color: #1f2f2f;
}

.destaques-titulos p {
  margin-top: 0.5rem;
  color: #6b6b6b;
  font-size: 1rem;
}

.destaques-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.2rem;
}

.cidade-card {
  background: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
  cursor: pointer;
}

.cidade-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(0,0,0,0.10);
}

.cidade-img {
  position: relative;
  height: 140px;
}

.cidade-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cidade-overlay {
  position: absolute;
  left: 12px;
  bottom: 10px;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0,0,0,0.35);
}

.cidade-nome {
  font-weight: 800;
  font-size: 1.05rem;
  line-height: 1.1;
}

.cidade-pais {
  font-size: 0.9rem;
}

.cidade-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
}

.kpi-label {
  display: block;
  font-size: 0.8rem;
  color: #7a7a7a;
  margin-bottom: 2px;
}

.kpi-value {
  font-weight: 800;
  color: #1f2f2f;
}

.footer-container {
    width: 90%;
    max-width: 1400px;
    display: flex;
    justify-content: center;
}

@media (max-width: 1200px) {
  .destaques-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .destaques-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .destaques-grid {
    grid-template-columns: 1fr;
  }

  .cidade-img {
    height: 170px;
  }
}

</style>