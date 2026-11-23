<script setup>
import { ref } from 'vue'
import BotaoDownload from './BotaoDownload.vue'

// Importação dos ícones
import iconExportar from '@/assets/images/icons_download/exportar.png' 
import iconEmail from '@/assets/images/icons_download/mail.png'
import iconInstagram from '@/assets/images/icons_download/instagram.png'
import iconWhatsapp from '@/assets/images/icons_download/Wpp.png'
import iconX from '@/assets/images/icons_download/x.png'
import iconFacebook from '@/assets/images/icons_download/fb.png'
import iconMessenger from '@/assets/images/icons_download/messenger.png'
import iconDownload from '@/assets/images/icons_download/download.png'
import iconLink from '@/assets/images/icons_download/link.png'

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  chartTitle: {
    type: String,
    default: 'Grafico'
  }
})

const isOpen = ref(false)
const showDownloadOptions = ref(false)

const socialNetworks = ref([
  { name: 'Email', icon: iconEmail, id: 'Email' },
  { name: 'Instagram', icon: iconInstagram, id: 'Instagram' },
  { name: 'Whatsapp', icon: iconWhatsapp, id: 'Whatsapp' },
  { name: 'X', icon: iconX, id: 'X' },
  { name: 'Facebook', icon: iconFacebook, id: 'Facebook' },
  { name: 'Messenger', icon: iconMessenger, id: 'Messenger' }
])

function openShare() {
  isOpen.value = true
  showDownloadOptions.value = false
}

function closeShare() {
  isOpen.value = false
  showDownloadOptions.value = false
}

function handleShare(networkId) {
  const url = window.location.href
  const text = `Vê este gráfico: ${props.chartTitle}`
  const fullMessage = `${text} ${url}`
  
  if (networkId === 'X') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  } 
  else if (networkId === 'Facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  } 
  else if (networkId === 'Whatsapp') {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`, '_blank')
  } 
  else if (networkId === 'Email') {
    window.open(`mailto:?subject=${encodeURIComponent(props.chartTitle)}&body=${encodeURIComponent(fullMessage)}`, '_blank')
  } 
  else if (networkId === 'Instagram') {
    navigator.clipboard.writeText(fullMessage)
    alert("Link copiado! A abrir Instagram... (Cola o link na tua Story ou Direct)")
    window.open('https://www.instagram.com/', '_blank')
  }
  else if (networkId === 'Messenger') {
    navigator.clipboard.writeText(fullMessage)
    alert("Link copiado! A abrir Messenger... (Cola o link na conversa)")
    window.open('https://www.messenger.com/', '_blank')
  }
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href)
  alert('Link copiado!')
}

function enableDownload() {
  showDownloadOptions.value = true
}
</script>

<template>
  <div class="share-component">
    <button class="share-trigger-btn" @click="openShare">
      <img :src="iconExportar" alt="Partilhar" />
    </button>

    <div v-if="isOpen" class="share-overlay" @click.self="closeShare">
      
      <div class="share-card">
        
        <div v-if="!showDownloadOptions" class="share-content">
          <div class="share-header">
            <h3>Share</h3>
            <button class="close-btn" @click="closeShare">×</button>
          </div>
          
          <div class="icons-grid">
            <div v-for="net in socialNetworks" :key="net.id" class="icon-item" @click="handleShare(net.id)">
              <div class="icon-wrapper">
                 <img :src="net.icon" :alt="net.name" class="social-icon">
              </div>
              <span>{{ net.name }}</span>
            </div>

            <div class="icon-item" @click="enableDownload">
              <div class="icon-wrapper">
                <img :src="iconDownload" alt="Download" class="social-icon">
              </div>
              <span>Download</span>
            </div>

            <div class="icon-item" @click="copyLink">
              <div class="icon-wrapper">
                <img :src="iconLink" alt="Link" class="social-icon">
              </div>
              <span>Copiar Link</span>
            </div>
          </div>
        </div>

        <BotaoDownload 
          v-else 
          :chartData="props.chartData" 
          :chartTitle="props.chartTitle"
          @back="showDownloadOptions = false"
          @close="closeShare" 
        />
        </div>
    </div>
  </div>
</template>

<style scoped>
.share-trigger-btn {
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-trigger-btn:hover {
  opacity: 1;
  background-color: #f0f0f0;
  border-radius: 50%;
}

.share-trigger-btn img {
  width: 24px;
  height: 27px;
}

/* Renomeado de modal-overlay */
.share-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Renomeado de modal-card */
.share-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  font-family: 'Inter', sans-serif;
}

/* Renomeado de modal-header */
.share-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.share-header h3 {
  margin: 0;
  font-size: 1.8rem;
  color: #444;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  line-height: 1;
}

/* Grelha de Ícones */
.icons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  row-gap: 30px;
  text-align: center;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.icon-item:hover {
  transform: translateY(-3px);
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background-color: #CEE6EA; 
  border-radius: 50%;
}

.social-icon {
  width: 55%;
  height: 55%;
  object-fit: contain;
}

.icon-item span {
  font-size: 0.85rem;
  color: #555;
  font-weight: 600;
}
</style>