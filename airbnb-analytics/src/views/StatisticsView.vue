<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useFiltrosStore } from '@/state/state'

// Configurações
const PORT = 3000

// Importações
import casapng from '@/assets/images/icons_elementos/casa.png'
import europng from '@/assets/images/icons_elementos/euro.png'
import percentagempng from '@/assets/images/icons_elementos/percentagem.png'
import userpng from '@/assets/images/icons_elementos/user.png'
import pinpng from '@/assets/images/icons_elementos/pin.png'

import iconDanger from '@/assets/images/icons_alertas/alert-danger.png'
import iconSuccess from '@/assets/images/icons_alertas/alert-success.png'
import iconInfo from '@/assets/images/icons_alertas/alert-info.png'
import iconLocation from '@/assets/images/icons_alertas/alert-location.png'
import vectorDown from '@/assets/images/icons_alertas/Vector.png'
import vectorUp from '@/assets/images/icons_alertas/Vector2.png'

import Filtro from '@/components/Filtro.vue'
import Card from '@/components/Card.vue'
import AlertCard from '@/components/AlertCard.vue'
import MapaInterativo from '@/components/MapaInterativo.vue'
import GraficoBarras from '@/components/GraficoBarras.vue'
import GraficoCircular from '@/components/GraficoCircular.vue'
import GraficoLinha from '@/components/GraficoLinha.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import Footer from '@/components/Footer.vue'

const store = useFiltrosStore()

const currentCity = ref(store.filtros.cidade)
const listings = ref([])
const calendar = ref([])
const loading = ref(true)
const mostrarMaisAlertas = ref(false)
const coresTipos = ['#36A2EB', '#FF6384', '#FFCE56']

const startDate = ref(null)
const endDate = ref(null)

const toggleMostrarMaisAlertas = () => (mostrarMaisAlertas.value = !mostrarMaisAlertas.value)

const listingsFiltradas = computed(() => {
  const f = store.filtros

  if (!f.vizinhanca && !f.tipo && !f.precoMin && !f.precoMax && !f.disponibilidade) {
    return listings.value
  }

  const resultado = []

  for (const l of listings.value) {
    let valido = true

    if (f.vizinhanca && f.vizinhanca.trim() !== '') {
      const b = f.vizinhanca.trim().toLowerCase()
      if (!(l.neighbourhood || '').toLowerCase().includes(b)) {
        valido = false
      }
    }

    if (f.tipo && valido) {
      let tipo = ''

      if (f.tipo.toLowerCase() === 'casa/apartamento') {
        tipo = 'entire home/apt'
      } else if (f.tipo.toLowerCase() === 'quartoprivado') {
        tipo = 'private room'
      } else if (f.tipo.toLowerCase() === 'quartopartilhado') {
        tipo = 'shared room'
      }

      if (tipo && (l.room_type || '').toLowerCase() !== tipo) {
        valido = false
      }
    }

    if (f.precoMin && valido) {
      if (l.price < f.precoMin) {
        valido = false
      }
    }

    if (f.precoMax && valido) {
      if (l.price > f.precoMax) {
        valido = false
      }
    }

    if (f.disponibilidade && valido) {
      if ((l.availability_365 || 0) < Number(f.disponibilidade)) {
        valido = false
      }
    }

    // se passou em tudo, entra no array final
    if (valido) {
      resultado.push(l)
    }
  }

  return resultado
})


const calendarFiltrado = computed(() => {
  const f = store.filtros
  const dadosOriginais = calendar.value
  const resultado = []

  let inicio = null
  if (f.inicio) {
    inicio = new Date(f.inicio)
  }

  let fim = null
  if (f.fim) {
    fim = new Date(f.fim)
  }

  for (let i = 0; i < dadosOriginais.length; i++) {
    const registo = dadosOriginais[i]
    const dataRegisto = new Date(registo.date)
    let valido = true

    if (inicio !== null) {
      if (dataRegisto < inicio) {
        valido = false
      }
    }

    if (fim !== null) {
      if (dataRegisto > fim) {
        valido = false
      }
    }

    if (valido === true) {
      resultado.push(registo)
    }
  }

  return resultado
})

const totalListings = computed(() => listingsFiltradas.value.length)

const averagePrice = computed(() => {
  const arr = listingsFiltradas.value;
  
  if (arr.length === 0) {
    return 0;
  }

  let somaTotal = 0;
  let quantidadeValida = 0;

  for (let i = 0; i < arr.length; i++) {
    const listing = arr[i];

    if (listing.price > 0) {
      somaTotal = somaTotal + listing.price;
      quantidadeValida = quantidadeValida + 1;
    }
  }

  if (quantidadeValida === 0) {
    return 0;
  }

  const media = somaTotal / quantidadeValida;
  return Math.round(media);
});

const activeHosts = computed(() => {
  const arr = listingsFiltradas.value;
  
  if (arr.length === 0) {
    return '0';
  }

  const hostsUnicos = new Set();

  for (let i = 0; i < arr.length; i++) {
    const listing = arr[i];
    
    if (listing.host_id) {
      hostsUnicos.add(listing.host_id);
    }
  }

  return hostsUnicos.size;
});

const occupancyRate = computed(() => {
  const arr = calendarFiltrado.value
  if (!arr.length)
    return 0

  let occupied = 0

  for (const c of arr) {
    const registo = String(c.available).trim().toLowerCase()
    if (registo === 'f' || registo === 'false' || registo === '0') {
      occupied++
    }
  }

  return Math.round((occupied / arr.length) * 100)
})

//Aleatorio
const growthData = computed(() => {
  let seed = 0;
  if (currentCity.value) {
    seed = currentCity.value.length;
  }

  const data = {};

  if (seed % 2 === 0) {
    data.listings = { val: '+1.2%', class: 'positivo' };
  } else {
    data.listings = { val: '-0.5%', class: 'negativo' };
  }

  data.price = { val: '+1.1%', class: 'positivo' };

  if (occupancyRate.value > 80) {
    data.occupancy = { val: '+5.2%', class: 'positivo' };
  } else {
    data.occupancy = { val: '-2.1%', class: 'negativo' };
  }

  data.hosts = { val: '+12 novos', class: 'positivo' };

  return data;
});

const neighbourhoodAvgPrices = computed(() => {
  const arr = listingsFiltradas.value;
  
  if (arr.length === 0) {
    return [];
  }

  const groups = {};

  for (let i = 0; i < arr.length; i++) {
    const listing = arr[i];
    const preco = listing.price;
    const nomeVizinhanca = listing.neighbourhood;

    if (preco > 0 && nomeVizinhanca) {
      if (!groups[nomeVizinhanca]) {
        groups[nomeVizinhanca] = { sum: 0, count: 0 };
      }
      groups[nomeVizinhanca].sum += preco;
      groups[nomeVizinhanca].count++;
    }
  }

  const resultadoFinal = [];
  for (const nome in groups) {
    const dados = groups[nome];
    const media = dados.sum / dados.count;
    
    resultadoFinal.push({
      name: nome,
      avg: media
    });
  }

  resultadoFinal.sort((a, b) => {
    return a.avg - b.avg;
  });

  return resultadoFinal;
});

const top3MaisCaras = computed(() => {
  const arr = neighbourhoodAvgPrices.value;
  const resultado = [];

  if (arr.length === 0) {
    return [];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    if (resultado.length < 3) {
      const item = arr[i];
      
      resultado.push({
        nome: item.name,
        pct: Math.round(item.avg) + "€"
      });
    } 
    else {
      break;
    }
  }

  return resultado;
});

const top3MaisEconomicas = computed(() => {
  const arr = neighbourhoodAvgPrices.value;
  const resultado = [];

  if (arr.length === 0) {
    return [];
  }

  for (let i = 0; i < arr.length; i++) {
    if (resultado.length < 3) {
      const item = arr[i];

      resultado.push({
        nome: item.name,
        pct: Math.round(item.avg) + "€"
      });
    } 
    else {
      break;
    }
  }

  return resultado;
});

const hostCounts = computed(() => {
  const listings = listingsFiltradas.value;
  const contagem = {};

  for (let i = 0; i < listings.length; i++) {
    const hostId = listings[i].host_id;

    if (contagem[hostId] === undefined) {
      contagem[hostId] = 1;
    } else {
      contagem[hostId] = contagem[hostId] + 1;
    }
  }

  return contagem;
});

const pctListingsMultiHosts5 = computed(() => {
  const listings = listingsFiltradas.value;
  const totalListings = listings.length;

  if (totalListings === 0) {
    return 0;
  }

  const counts = hostCounts.value;
  let contadorMultiListings = 0;

  for (let j = 0; j < listings.length; j++) {
    const hostId = listings[j].host_id;
    const totalAnunciosDesteDono = counts[hostId];

    if (totalAnunciosDesteDono >= 5) {
      contadorMultiListings = contadorMultiListings + 1;
    }
  }

  const resultado = (contadorMultiListings / totalListings) * 100;
  
  return Math.round(resultado);
});

const top3MaisListagens = computed(() => {
  const listings = listingsFiltradas.value;
  const counts = {};

  for (let i = 0; i < listings.length; i++) {
    let nome = listings[i].neighbourhood;
    
    if (!nome) {
      nome = 'N/A';
    }

    if (counts[nome] === undefined) {
      counts[nome] = 1;
    } else {
      counts[nome] = counts[nome] + 1;
    }
  }

  const listaOrdenada = [];
  for (const bairro in counts) {
    listaOrdenada.push([bairro, counts[bairro]]);
  }

  listaOrdenada.sort((a, b) => {
    return b[1] - a[1];
  });

  const resultado = [];
  for (let j = 0; j < listaOrdenada.length; j++) {
    if (resultado.length < 3) {
      const item = listaOrdenada[j];
      resultado.push({
        nome: item[0],
        pct: item[1] + " listagens"
      });
    } else {
      break;
    }
  }

  return resultado;
});

const matureListingsCount = computed(() => {
  const listings = listingsFiltradas.value;
  let contador = 0;

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].number_of_reviews >= 50) {
      contador = contador + 1;
    }
  }
  return contador;
});

const zeroReviewsCount = computed(() => {
  const listings = listingsFiltradas.value;
  let contador = 0;

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].number_of_reviews === 0) {
      contador = contador + 1;
    }
  }
  return contador;
});

const avgMinNights = computed(() => {
  const listings = listingsFiltradas.value;
  const total = listings.length;

  if (total === 0) {
    return 0;
  }

  let somaTotalNoites = 0;

  for (let i = 0; i < total; i++) {
    let noitesMinimas = listings[i].minimum_nights;

    if (!noitesMinimas) {
      noitesMinimas = 1;
    }

    somaTotalNoites = somaTotalNoites + noitesMinimas;
  }

  const media = somaTotalNoites / total;
  return Math.round(media);
});

const luxuryCount = computed(() => {
  const listings = listingsFiltradas.value;
  let contadorLuxo = 0;

  for (let i = 0; i < listings.length; i++) {
    const preco = listings[i].price;

    if (preco > 200) {
      contadorLuxo = contadorLuxo + 1;
    }
  }

  return contadorLuxo;
});

const highOccupancyCount = computed(() => {
  const listings = listingsFiltradas.value;
  let contador = 0;

  for (let i = 0; i < listings.length; i++) {
    const l = listings[i];
    let disponibilidade = 0;
    if (l.availability_365) {
      disponibilidade = l.availability_365;
    }
    const diasOcupados = 365 - disponibilidade;
    if (diasOcupados > 350) {
      contador = contador + 1;
    }
  }
  return contador;
});

const entireHomePct = computed(() => {
  const listings = listingsFiltradas.value;
  const total = listings.length;

  if (total === 0) {
    return 0;
  }

  let contadorCasasInteiras = 0;

  for (let i = 0; i < total; i++) {
    if (listings[i].room_type === 'Entire home/apt') {
      contadorCasasInteiras = contadorCasasInteiras + 1;
    }
  }

  const percentagem = (contadorCasasInteiras / total) * 100;
  return Math.round(percentagem);
});

const newHostsCount = computed(() => {
  const listings = listingsFiltradas.value;
  
  if (listings.length === 0) return 0;
  if (!startDate.value || !endDate.value) return 0;

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  const primeiraDataDoHost = new Map();

  for (let i = 0; i < listings.length; i++) {
    const l = listings[i];
    const dataCadastro = new Date(l.host_since);
    const dataExistente = primeiraDataDoHost.get(l.host_id);

    if (!dataExistente || dataCadastro < dataExistente) {
      primeiraDataDoHost.set(l.host_id, dataCadastro);
    }
  }

  let contadorNovos = 0;
  for (const data of primeiraDataDoHost.values()) {
    if (data >= start && data <= end) {
      contadorNovos = contadorNovos + 1;
    }
  }

  return contadorNovos;
});

const colunasAlertas = computed(() => {
  if (listingsFiltradas.value.length === 0) {
  const aviso = { title: 'Aviso', text: 'Dados Insuficientes' };
  const avisoLista = { title: 'Aviso', isList: false, text: 'Dados Insuficientes' };

  return {
    danger: { 
      main: [aviso], 
      extra: [aviso] 
    },
    location: { 
      main: [avisoLista], 
      extra: [avisoLista] 
    },
    success: { 
      main: [aviso], 
      extra: [aviso] 
    },
    info: { 
      main: [aviso], 
      extra: [aviso] 
    }
  };
}

  const semDados = "Dados Insuficientes!";

  const dangerMain = [];
  if (highOccupancyCount.value > 0) {
    dangerMain.push({ title: 'Alta Ocupação', text: `${highOccupancyCount.value} listagens com >350 dias de ocupação/ano.` });
  } else {
    dangerMain.push({ title: 'Alta Ocupação', text: semDados });
  }

  const dangerExtra = [];
  if (entireHomePct.value > 0) {
    dangerExtra.push({ title: 'Habitação vs AL', text: `${entireHomePct.value}% são casas inteiras retiradas do mercado.` });
  } else {
    dangerExtra.push({ title: 'Habitação vs AL', text: semDados });
  }
  if (pctListingsMultiHosts5.value > 0) {
    dangerExtra.push({ title: 'Multi-anfitriões', text: `${pctListingsMultiHosts5.value}% de listagens são de multi-anfitrioes (>= 5 listagens).` });
  } else {
    dangerExtra.push({ title: 'Multi-anfitriões', text: semDados });
  }

  const locationMain = [];
  if (top3MaisCaras.value.length > 0) {
    locationMain.push({ title: 'Top Zonas Mais Caras', isList: true, items: top3MaisCaras.value });
  } else {
    locationMain.push({ title: 'Top Zonas Mais Caras', isList: false, text: semDados });
  }

  const locationExtra = [];
  if (top3MaisListagens.value.length > 0) {
    locationExtra.push({ title: 'Top Zonas com Mais Listagens', isList: true, items: top3MaisListagens.value });
  } else {
    locationExtra.push({ title: 'Top Zonas com Mais Listagens', isList: false, text: semDados });
  }

  if (top3MaisEconomicas.value.length > 0) {
    locationExtra.push({ title: 'Top Zonas Mais Económicas', isList: true, items: top3MaisEconomicas.value });
  } else {
    locationExtra.push({ title: 'Top Zonas Mais Económicas', isList: false, text: semDados });
  }

  const successMain = [];
  if (occupancyRate.value > 0) {
    successMain.push({ title: 'Turismo Ativo', text: `Ocupação de ${occupancyRate.value}% indica mercado saudável.` });
  } else {
    successMain.push({ title: 'Turismo Ativo', text: semDados });
  }

  const successExtra = [];
  if (newHostsCount.value > 0) {
    successExtra.push({ title: 'Novos anfitriões', text: `${newHostsCount.value} novos anfitriões no intervalo selecionado.` });
  } else {
    successExtra.push({ title: 'Novos anfitriões', text: semDados });
  }

  if (matureListingsCount.value > 0) {
    successExtra.push({ title: 'Oferta Consolidada', text: `${matureListingsCount.value} alojamentos têm mais de 50 avaliações.` });
  } else {
    successExtra.push({ title: 'Oferta Consolidada', text: semDados });
  }

  const infoMain = [];
  if (luxuryCount.value > 0) {
    infoMain.push({ title: 'Mercado de Luxo', text: `${luxuryCount.value} casas acima de 200€/noite.` });
  } else {
    infoMain.push({ title: 'Mercado de Luxo', text: semDados });
  }

  const infoExtra = [];
  if (avgMinNights.value > 0) {
    infoExtra.push({ title: 'Estadia Mínima', text: `Média de ${avgMinNights.value} noites por reserva.` });
  } else {
    infoExtra.push({ title: 'Estadia Mínima', text: semDados });
  }

  if (zeroReviewsCount.value > 0) {
    infoExtra.push({ title: 'Alojamentos sem reviews', text: `${zeroReviewsCount.value} alojamentos não têm avaliações.` });
  } else {
    infoExtra.push({ title: 'Alojamentos sem reviews', text: semDados });
  }

  return {
    danger: { main: dangerMain, extra: dangerExtra },
    location: { main: locationMain, extra: locationExtra },
    success: { main: successMain, extra: successExtra },
    info: { main: infoMain, extra: infoExtra }
  };
});

const chartDataHistory = computed(() => {
  const monthsLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const listingsCountData = new Array(12).fill(0)
  const occupancyData = new Array(12).fill(0)
  const monthStats = {}

  const cal = calendarFiltrado.value
  if (cal.length > 0) {
    cal.forEach(d => {
      const dateObj = new Date(d.date)
      const monthIndex = dateObj.getMonth()

      if (!monthStats[monthIndex]) {
        monthStats[monthIndex] = {
          uniqueListings: new Set(),
          totalDays: 0,
          busyDays: 0
        }
      }

      if (d.listing_id) {
        monthStats[monthIndex].uniqueListings.add(d.listing_id)
      }

      monthStats[monthIndex].totalDays++

      const av = String(d.available).trim().toLowerCase()
      if (av === 'f' || av === 'false' || av === '0') {
        monthStats[monthIndex].busyDays++
      }
    })

    for (let i = 0; i < 12; i++) {
      if (monthStats[i]) {
        listingsCountData[i] = monthStats[i].uniqueListings.size
        const total = monthStats[i].totalDays
        const busy = monthStats[i].busyDays
        occupancyData[i] = total > 0 ? Math.round((busy / total) * 100) : 0
      }
    }
  }

  return { meses: monthsLabels, totalListings: listingsCountData, ocupacao: occupancyData }
})


const chartDataNeighbourhoods = computed(() => {
  const arr = listingsFiltradas.value
  if (!arr.length) return { labels: [], values: [], fullLabels: [] }

  const c = {}
  arr.forEach(l => (c[l.neighbourhood] = (c[l.neighbourhood] || 0) + 1))

  const s = Object.entries(c)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const cleanLabels = s.map(i => {
    let name = i[0]
    name = name
      .replace(/União das Freguesias d[oe] /g, '')
      .replace(/União de Freguesias d[oe] /g, '')
      .replace('Junta de Freguesia de ', '')
    return name.length > 15 ? name.substring(0, 15) + '...' : name
  })

  const fullLabels = s.map(i => i[0])
  return { labels: cleanLabels, values: s.map(i => i[1]), fullLabels }
})

const chartDataRoomTypes = computed(() => {
  const arr = listingsFiltradas.value
  if (!arr.length) return { labels: [], values: [] }
  const c = {}
  arr.forEach(l => (c[l.room_type] = (c[l.room_type] || 0) + 1))
  return { labels: Object.keys(c), values: Object.values(c) }
})


async function fetchData() {
  loading.value = true
  try {
    const city = (currentCity.value || '').toLowerCase()
    if (!city) {
      listings.value = []
      calendar.value = []
      return
    }

    const res = await fetch(`http://localhost:${PORT}/${city}.listings`)
    if (res.ok) listings.value = await res.json()

    try {
      const resCal = await fetch(`http://localhost:${PORT}/${city}.calendar`)
      if (resCal.ok) calendar.value = await resCal.json()
    } catch {
      calendar.value = []
    }
  } catch (e) {
    console.error(e)
    listings.value = []
    calendar.value = []
  } finally {
    loading.value = false
  }
}

watch(
  () => store.filtros, 
  (novosFiltros) => {
    currentCity.value = novosFiltros.cidade || ''
    startDate.value = novosFiltros.inicio || null
    endDate.value = novosFiltros.fim || null

    if (!currentCity.value) {
      listings.value = []
      calendar.value = []
      return
    }

    fetchData()
  }, 
)

onMounted(fetchData)
</script>


<template>
  <ErrorAlert 
    v-if="store.error.active"
  />
  <div id="statistics-container">
    <div id="grid-container">
      <div class="sidebar-wrapper"><Filtro @aplicar="receberFiltros" /></div>

      <div id="dados">
        <div v-if="loading" class="loading-box"><h2>A carregar dados...</h2></div>
        <div v-else>
            <h2 class="titulo-pag">Análise: {{ store.filtros.cidade }}</h2>

            <div id="stats-cards">
                <Card><template #header>Total de Listagens</template><template #icon><img :src="casapng" class="img-card"></template><h1>{{ totalListings }}</h1></Card>
                <Card><template #header>Preço Médio/Noite</template><template #icon><img :src="europng" class="img-card"></template><h1>{{ averagePrice }}€</h1></Card>
                <Card><template #header>Taxa de Ocupação</template><template #icon><img :src="percentagempng" class="img-card"></template><h1>{{ occupancyRate }}%</h1></Card>
                <Card><template #header>Anfitriões Ativos</template><template #icon><img :src="userpng" class="img-card"></template><h1>{{ activeHosts }}</h1></Card>
            </div>

            <div id="alerts" class="alerts-box">
                <h2 class="alerts-title">Alertas e Destaques</h2>
                
                <div class="columns-container">
                    
                    <div class="alert-col">
                        <AlertCard v-for="(a, i) in colunasAlertas.danger.main" :key="'dm'+i" class="danger alert-fixed-height">
                            <template #icon><img :src="iconDanger"></template>
                            <template #header>{{ a.title }}</template>{{ a.text }}
                        </AlertCard>
                        <div class="expandable-wrapper" :class="{ open: mostrarMaisAlertas }">
                            <div class="expandable-content">
                                <AlertCard v-for="(a, i) in colunasAlertas.danger.extra" :key="'de'+i" class="danger alert-fixed-height">
                                    <template #icon><img :src="iconDanger"></template>
                                    <template #header>{{ a.title }}</template>{{ a.text }}
                                </AlertCard>
                            </div>
                        </div>
                    </div>

                    <div class="alert-col">
                        <AlertCard v-for="(a, i) in colunasAlertas.location.main" :key="'lm'+i" class="location alert-fixed-height">
                            <template #icon><img :src="iconLocation"></template>
                            <template #header>{{ a.title }}</template>
                                <ul v-if="a.isList" style="padding-left: 20px; margin: 0;">
                                <li v-for="b in a.items" :key="b.nome" style="margin-bottom:5px;">
                                    {{ b.nome }} ({{ b.pct }})
                                </li>
                                </ul>
                                <span v-else>{{ a.text }}</span>
                            </AlertCard>
                        <div class="expandable-wrapper" :class="{ open: mostrarMaisAlertas }">
                            <div class="expandable-content">
                                <AlertCard v-for="(a, i) in colunasAlertas.location.extra" :key="'le'+i" class="location alert-fixed-height">
                                    <template #icon><img :src="iconLocation"></template>
                                    <template #header>{{ a.title }}</template>
                                    <ul v-if="a.isList" style="padding-left: 20px; margin: 0;">
                                        <li v-for="b in a.items" :key="b.nome" style="margin-bottom:5px;">{{ b.nome }} ({{ b.pct }})</li>
                                    </ul>
                                    <span v-else>{{ a.text }}</span>
                                </AlertCard>
                            </div>
                        </div>
                    </div>

                    <div class="alert-col">
                        <AlertCard v-for="(a, i) in colunasAlertas.success.main" :key="'sm'+i" class="success alert-fixed-height">
                            <template #icon><img :src="iconSuccess"></template>
                            <template #header>{{ a.title }}</template>{{ a.text }}
                        </AlertCard>
                        <div class="expandable-wrapper" :class="{ open: mostrarMaisAlertas }">
                            <div class="expandable-content">
                                <AlertCard v-for="(a, i) in colunasAlertas.success.extra" :key="'se'+i" class="success alert-fixed-height">
                                    <template #icon><img :src="iconSuccess"></template>
                                    <template #header>{{ a.title }}</template>{{ a.text }}
                                </AlertCard>
                            </div>
                        </div>
                    </div>

                    <div class="alert-col">
                        <AlertCard v-for="(a, i) in colunasAlertas.info.main" :key="'im'+i" class="info alert-fixed-height">
                            <template #icon><img :src="iconInfo"></template>
                            <template #header>{{ a.title }}</template>{{ a.text }}
                        </AlertCard>
                        <div class="expandable-wrapper" :class="{ open: mostrarMaisAlertas }">
                            <div class="expandable-content">
                                <AlertCard v-for="(a, i) in colunasAlertas.info.extra" :key="'ie'+i" class="info alert-fixed-height">
                                    <template #icon><img :src="iconInfo"></template>
                                    <template #header>{{ a.title }}</template>{{ a.text }}
                                </AlertCard>
                            </div>
                        </div>
                    </div>

                </div>

                <button class="alerts-toggle" type="button" @click="toggleMostrarMaisAlertas">
                    <img v-if="!mostrarMaisAlertas" :src="vectorDown" alt="Mais">
                    <img v-else :src="vectorUp" alt="Menos">
                </button>
            </div>

            <div id="graficos">
                <GraficoLinha 
                    :labels="chartDataHistory.meses" 
                    :valores="chartDataHistory.totalListings" 
                    titulo="Total de Listagens" 
                    cor="#3b82f6"
                >
                    <template #header>Evolução Temporal - Total de Listagens</template>
                </GraficoLinha>
                
                <GraficoLinha 
                    :labels="chartDataHistory.meses" 
                    :valores="chartDataHistory.ocupacao" 
                    titulo="Ocupação (%)" 
                    cor="#FF6384"
                >
                    <template #header>Evolução Temporal - Ocupação(%)</template>
                </GraficoLinha>
                
                <GraficoBarras 
                    :labels="chartDataNeighbourhoods.labels" 
                    :valores="chartDataNeighbourhoods.values"
                    :nomes-completos="chartDataNeighbourhoods.fullLabels"
                >
                    <template #header>Top Freguesias</template>
                </GraficoBarras>

                <GraficoCircular :labels="chartDataRoomTypes.labels" :valores="chartDataRoomTypes.values" :cores="coresTipos"><template #header>Tipologias</template></GraficoCircular>
            </div>

            <div id="mapa-interativo">
                <MapaInterativo :cidade="currentCity" :key="currentCity">
                    <template #img><img :src="pinpng" width="30px" height="40px"/></template>
                    <template #header>Mapa - {{ currentCity }}</template>
                </MapaInterativo>
            </div>

            <div class="footer-container">
              <Footer />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#statistics-container {
    display: flex;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    padding-top: 100px;
}

#grid-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    width: 95%;
    padding: 2rem;
}

.sidebar-wrapper {
    width: 300px;
    flex-shrink: 0;
    align-self: flex-start;
    position: sticky;
    top: 100px;
}

#dados {
    background: #f9f9f9;
    border-radius: 12px;
    padding: 2rem;
    min-height: 400px;
    flex: 1;
    width: 100%;
}

.loading-box {
    text-align: center;
    padding: 50px;
    color: #666;
}

.titulo-pag {
    margin-bottom: 20px;
    color: #444;
}

#stats-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    width: 100%;
}

.alerts-box {
    width: 100%;
    margin-top: 2rem;
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #dcdcdc;
    padding: 1.5rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.alerts-title {
    margin: 0 0 1.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
}

.columns-container {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    width: 100%;
}

.alert-col {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.alert-fixed-height {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.alert-col > .expandable-wrapper {
    margin-top: 0;
}
.alert-col > .expandable-wrapper.open {
    margin-top: 1.5rem;
}

.expandable-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.4s ease-out, margin-top 0.4s ease-out;
    opacity: 0;
}

.expandable-wrapper.open {
    grid-template-rows: 1fr;
    opacity: 1;
    transition: grid-template-rows 0.4s ease-out, margin-top 0.4s ease-out, opacity 0.6s ease-in;
}

.expandable-content {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.alerts-toggle {
    background: none;
    border: none;
    cursor: pointer;
    margin: 2rem auto 0;
    transition: transform 0.2s;
    display: flex;
    justify-content: center;
}

.alerts-toggle:hover {
    transform: scale(1.1);
}

.alerts-toggle img {
    width: 46px;
    height: 27px;
}

#graficos {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

#mapa-interativo {
    margin-top: 2rem;
    height: 500px; 
    background-color: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    padding: 1.5rem; 
    display: flex;
    flex-direction: column;
    box-sizing: border-box; 
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

#mapa-interativo:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.12);
}

@media (max-width: 1100px) {
    .columns-container { 
      flex-wrap: wrap; 
    }
    .alert-col { 
      flex: 1 1 45%; margin-bottom: 1.5rem; 
    }
}

@media (max-width: 900px) {
    #grid-container { 
      flex-direction: column; padding: 1rem; 
    }
    .sidebar-wrapper { 
      width: 100%; position: static; 
    }
    #graficos { 
      grid-template-columns: 1fr; 
    }
    .alert-col { 
      flex: 1 1 100%; 
    }
}
</style>