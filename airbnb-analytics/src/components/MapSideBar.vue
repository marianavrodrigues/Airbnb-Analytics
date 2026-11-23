<script setup>
import { ref } from 'vue'
import casapng from '@/assets/images/icons_elementos/casa.png'
import FreguesiaCard from '@/components/FreguesiaCard.vue'

const props = defineProps({
  cidadeAtual: { type: String, default: 'Porto' },
  freguesias: { type: Array, default: () => [] },
  totalListings: { type: Number, default: 0 },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['mudarCidade', 'selecionarFreguesia'])

const cidadesDisponiveis = ['Porto', 'Lisboa', 'Madrid']

function onCidadeChange(event) {
  emit('mudarCidade', event.target.value)
}

function cliqueFreguesia(nomeFreguesia) {
  emit('selecionarFreguesia', nomeFreguesia)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      
      <div class="native-select-wrapper">
        <img :src="casapng" class="header-icon" />
        
        <select 
          :value="cidadeAtual" 
          @change="onCidadeChange" 
          class="city-select-native"
        >
          <option v-for="cidade in cidadesDisponiveis" :key="cidade" :value="cidade">
            {{ cidade }}
          </option>
        </select>
      </div>

      <div class="city-meta">
        {{ freguesias.length }} Freguesias • {{ totalListings.toLocaleString() }} habitações
      </div>
    </div>

    <div class="content-wrapper">
      <h2 class="section-title">Freguesias</h2>
      <div v-if="loading" class="loading-text">A carregar...</div>
      
      <div v-else class="cards-container">
        <FreguesiaCard 
            v-for="zone in freguesias" 
            :key="zone.nome" 
            :zone="zone"
            @click="cliqueFreguesia(zone.nome)"
        />
      </div>

      <div class="legenda-container">
          <h4 class="legenda-title">Legenda</h4>
          <div class="legenda-item"><span class="dot critical"></span> <span class="leg-text">> 40% - Crítico</span></div>
          <div class="legenda-item"><span class="dot high"></span> <span class="leg-text">20-40% - Alto</span></div>
          <div class="legenda-item"><span class="dot medium"></span> <span class="leg-text">5-20% - Médio</span></div>
          <div class="legenda-item"><span class="dot low"></span> <span class="leg-text">&lt; 5% - Baixo</span></div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 300px;
  min-width: 300px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative; 
  height: fit-content;
  max-height: calc(100vh - 140px);
}

.sidebar-header {
  margin-bottom: 0.5rem; 
  position: relative;
  z-index: 100;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.8rem;
  flex-shrink: 0;
}

.native-select-wrapper {
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0 0.6rem;
  margin-bottom: 8px;
  height: 42px;
}

.native-select-wrapper:hover {
  border-color: #aaa;
}

.native-select-wrapper:focus-within {
  border-color: #2d6e72;
  background: #fff;
}

.header-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  filter: brightness(0) saturate(100%) invert(28%) sepia(16%) saturate(1066%) hue-rotate(143deg) brightness(93%) contrast(88%);
  flex-shrink: 0;
}

.city-select-native {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  height: 100%;
  outline: none;
  cursor: pointer;
  width: 100%;
}

.city-meta { 
  font-size: 0.75rem; 
  color: #888; 
  margin-left: 5px; 
  margin-top: 5px; 
}

.content-wrapper { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  overflow: hidden; 
  min-height: 0;
}

.section-title { 
  font-size: 1.1rem; 
  font-weight: 600; 
  color: #000; 
  margin: 0.5rem 0 0.5rem 0; 
}

.cards-container { 
  flex: 1; 
  overflow-y: auto; 
  padding-right: 5px; 
  margin-bottom: 1rem; 
  min-height: 150px;
}

.dot { width: 8px; height: 8px; border-radius: 50%; margin-right: 8px; }
.dot.critical { background-color: #c0392b; }
.dot.high { background-color: #d35400; }
.dot.medium { background-color: #d4ac0d; }
.dot.low { background-color: #27ae60; }

.legenda-container { 
  border-top: 1px solid #eee; 
  padding-top: 1rem; 
  flex-shrink: 0;
}

.legenda-title { 
  font-size: 0.85rem; 
  font-weight: 600; 
  margin: 0 0 8px 0; 
}

.legenda-item { 
  display: flex; 
  align-items: center; 
  margin-bottom: 5px; 
}

.leg-text { 
  font-size: 0.75rem; 
  color: #666; 
}

.cards-container::-webkit-scrollbar { width: 4px; }
.cards-container::-webkit-scrollbar-track { background: #f9f9f9; }
.cards-container::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }

@media (max-width: 900px) {
  .sidebar {
    width: 100%;
    min-width: 0;
    max-height: 500px;
    margin-bottom: 10px;
  }

  .cards-container{
    height: 200px;
    flex: none;
  }
}
</style>