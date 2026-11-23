<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useFiltrosStore } from '@/state/state'
import MapaInterativo from '@/components/MapaInterativo.vue'
import MapSideBar from '@/components/MapSideBar.vue'
import Footer from '@/components/Footer.vue'

const PORT = 3000
const store = useFiltrosStore()

const listings = ref([])
const loading = ref(true)
const zoomTarget = ref(null) 

function handleCityChange(novaCidade) {
  store.filtros.cidade = novaCidade
  zoomTarget.value = null
}

function focarFreguesia(nomeFreguesia) {
  let somaLat = 0
  let somaLng = 0
  let count = 0

  for (const l of listings.value) {
    let n = l.neighbourhood || ''
    n = n.replace(/União das Freguesias d[oe] /g, '')
    n = n.replace(/União de Freguesias d[oe] /g, '')
    n = n.replace('Junta de Freguesia de ', '')
    
    if (n === nomeFreguesia) {
      somaLat += Number(l.latitude)
      somaLng += Number(l.longitude)
      count++
    }
  }

  if (count > 0) {
    zoomTarget.value = {
      lat: somaLat / count,
      lng: somaLng / count,
      zoom: 15 
    }
  }
}

async function fetchData() {
  loading.value = true
  const cidade = (store.filtros.cidade || 'porto').toLowerCase()
  
  try {
    const res = await fetch(`http://localhost:${PORT}/${cidade}.listings`)
    if (res.ok) {
      listings.value = await res.json()
    }
  } catch (e) {
    console.error("Erro ao carregar mapa:", e)
  } finally {
    loading.value = false
  }
}

const topFreguesias = computed(() => {
  if (!listings.value.length) return []

  const counts = {}
  for (const l of listings.value) {
    let n = l.neighbourhood || 'Outros'
    n = n.replace(/União das Freguesias d[oe] /g, '')
    n = n.replace(/União de Freguesias d[oe] /g, '')
    n = n.replace('Junta de Freguesia de ', '')
    
    if (!counts[n]) {
      counts[n] = 0
    }
    counts[n]++
  }

  const tempArray = []
  for (const key in counts) {
    tempArray.push([key, counts[key]])
  }

  tempArray.sort((a, b) => b[1] - a[1])

  const resultado = []
  const totalALs = listings.value.length

  for (const item of tempArray) {
    const nome = item[0]
    const count = item[1]
    
    let ratio = 0
    if (totalALs > 0) {
      ratio = ((count / totalALs) * 100).toFixed(1)
    }

    let colorClass = 'low'
    if (ratio > 40) colorClass = 'critical'
    else if (ratio >= 20) colorClass = 'high'
    else if (ratio >= 5) colorClass = 'medium'

    resultado.push({
      nome: nome,
      count: count,
      ratio: ratio,
      colorClass: colorClass
    })
  }

  return resultado
})

onMounted(fetchData)

watch(() => store.filtros.cidade, fetchData)
</script>

<template>
  <div class="dashboard-layout">
    <MapSideBar 
      :cidade-atual="store.filtros.cidade || 'Porto'"
      :freguesias="topFreguesias"
      :total-listings="listings.length"
      :loading="loading"
      @mudar-cidade="handleCityChange"
      @selecionar-freguesia="focarFreguesia" 
    />

    <main class="map-container-full">
      <MapaInterativo 
        :cidade="store.filtros.cidade || 'porto'" 
        :listings="listings"
        :zoom-target="zoomTarget"
        class="mapa-real"
      />
    </main>
  </div>
  <div class="footer-container">
      <Footer />
  </div>
</template>

<style scoped>

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.dashboard-layout {
  display: flex;
  flex: 1;
  height: calc(100vh - 80px);
  padding-top: 20px;
  background-color: transparent; 
  gap: 2rem; 
  padding: 2rem;
  padding-top: 100px;
  box-sizing: border-box;
  width: 95%; 
  margin: 0 auto;
  justify-content: center; 
}

.map-container-full {
  flex: 1;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08); 
  border: 1px solid #dcdcdc;
  height: calc(100vh - 140px);
}

.mapa-real {
  width: 100%;
  height: 100%;
}

.footer-container {
  width: 95%;
  margin: 0 auto;
  margin-top: 40px; 
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
}

@media (max-width: 900px) {
  .dashboard-layout {
    flex-direction: column;
    height: auto;
    padding: 1rem;
    padding-top: 90px;
    width: 100%;
    gap: 1rem;
  }

  .map-container-full {
    height: 500px;
    width: 100%;
  }
}
</style>