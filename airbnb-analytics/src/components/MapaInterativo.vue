<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import MapPopup from '@/components/MapPopup.vue'

const props = defineProps({
  cidade: { type: String, default: 'porto' },
  listings: { type: Array, default: () => [] },
  zoomTarget: { type: Object, default: null } 
})

const mapContainer = ref(null)
const infoWindowTemplate = ref(null)
const mapError = ref('')
let map = null
let markersArray = [] 
let infoWindow = null

const casaSelecionada = ref({
  name: '',
  price: 0,
  room_type: '',
  host_name: '',
  reviews: 0,
  availability: 0,
  min_nights: 0
})

const locais = {
  porto:  { lat: 41.1579, lng: -8.6291 },
  lisboa: { lat: 38.7223, lng: -9.1393 },
  madrid: { lat: 40.4168, lng: -3.7038 }
}

function initMap() {
  const cidadeKey = props.cidade.toLowerCase()
  const centro = locais[cidadeKey] || locais.lisboa

  if (!map) {
    map = new window.google.maps.Map(mapContainer.value, {
      center: centro,
      zoom: 13,
      mapTypeId: 'roadmap',
      disableDefaultUI: false,
      styles: [ 
        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] } 
      ]
    })
  } else {
    if (!props.zoomTarget) {
      map.setCenter(centro)
      map.setZoom(13)
    }
  }
  updateMarkers()
}

function updateMarkers() {
  if (!map) return

  for (const m of markersArray) {
    m.setMap(null)
  }
  markersArray = []

  if (!props.listings || props.listings.length === 0) {
    const cidadeKey = props.cidade.toLowerCase()
    const centro = locais[cidadeKey] || locais.lisboa
    
    const marker = new window.google.maps.Marker({
      position: centro,
      map: map,
      title: props.cidade.toUpperCase(),
      animation: window.google.maps.Animation.DROP
    })
    
    markersArray.push(marker)
    return
  }

  for (const house of props.listings) {
    if (house.latitude && house.longitude) {
      const circle = new window.google.maps.Circle({
        strokeColor: "#FF0000", 
        strokeOpacity: 0.8, 
        strokeWeight: 0,
        fillColor: "#FF0000", 
        fillOpacity: 0.35,
        map: map,
        center: { lat: Number(house.latitude), lng: Number(house.longitude) },
        radius: 30, 
        clickable: true
      })
      
      circle.addListener("click", async () => {
        casaSelecionada.value = {
          name: house.name || 'Alojamento sem nome',
          price: house.price,
          room_type: house.room_type,
          host_name: house.host_name,
          reviews: house.number_of_reviews || 0,
          rating: house.review_scores_rating || 'N/A',
          availability: house.availability_365 || 0,
          min_nights: house.minimum_nights || 1
        }

        await nextTick()

        if (!infoWindow) {
          infoWindow = new window.google.maps.InfoWindow({maxWidth: 300})
        }

        infoWindow.setContent(infoWindowTemplate.value.innerHTML)
        infoWindow.setPosition({ lat: Number(house.latitude), lng: Number(house.longitude) })
        infoWindow.open(map)
      })

      markersArray.push(circle)
    }
  }
}

watch(() => props.zoomTarget, (newVal) => {
  if (map && newVal) {
    map.panTo({ lat: newVal.lat, lng: newVal.lng })
    map.setZoom(newVal.zoom)
  }
})

watch(() => props.cidade, () => { initMap() })
watch(() => props.listings, updateMarkers, { deep: true })

onMounted(() => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim()

  if (!apiKey || apiKey === 'SUA_CHAVE_AQUI') {
    mapError.value = 'Para visualizar o mapa, configura VITE_GOOGLE_MAPS_API_KEY no ficheiro .env.local (consulta o README).'
    return
  }

  if (window.google?.maps) {
    initMap()
    return
  }

  const callbackName = '__airbnbAnalyticsGoogleMapsReady'
  window[callbackName] = () => {
    delete window[callbackName]
    if (mapContainer.value) initMap()
  }

  const script = document.createElement('script')
  const params = new URLSearchParams({
    key: apiKey,
    libraries: 'marker,geometry,drawing',
    loading: 'async',
    callback: callbackName,
  })
  script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`
  script.async = true
  script.onerror = () => {
    delete window[callbackName]
    mapError.value = 'Não foi possível carregar o Google Maps. Verifica a chave, as restrições e a ligação à Internet.'
  }
  document.head.appendChild(script)
})
</script>

<template>
  <div class="map-wrapper-component">
    <div v-if="$slots.header" class="titulo-overlay">Mapa Interativo</div>

    <div ref="mapContainer" class="map-canvas">
      <div v-if="mapError" class="map-error" role="status">{{ mapError }}</div>
    </div>

    <div style="display: none" ref="infoWindowTemplate">
       <MapPopup :listing="casaSelecionada" />
    </div>
  </div>
</template>

<style scoped>
.map-wrapper-component { 
  width: 100%; 
  height: 100%; 
  display: flex; 
  flex-direction: column; 
}

.map-error {
  padding: 1.5rem;
  color: #444;
  font-size: 0.95rem;
}

.map-canvas { 
  width: 100%; 
  flex: 1; 
  background-color: #e5e3df; 
  border-radius: 12px; 
  overflow: hidden; 
}

.titulo-overlay { 
  display: flex; 
  align-items: center; 
  flex-shrink: 0; 
  padding-bottom: 10px;
  font-weight: 600; 
  font-size: 1.1rem; 
  color: #444; 
}

</style>