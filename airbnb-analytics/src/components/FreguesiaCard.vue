<script setup>
defineProps({
  zone: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div 
    class="freguesia-card"
    :class="zone.colorClass"
    :title="zone.nome"
  >
    <div class="card-info">
      <span class="freguesia-name">{{ zone.nome }}</span>
      <span class="freguesia-sub">{{ (zone.count * 2.5).toFixed(0) }} habitações</span>
      <span class="freguesia-sub secondary">{{ zone.count }} ALs</span>
    </div>

    <div class="card-stats">
      <span class="stat-value" :class="zone.colorClass">{{ zone.ratio }}%</span>
      <span class="stat-label">rácio</span>
    </div>
  </div>
</template>

<style scoped>
.freguesia-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.freguesia-card.critical:hover { 
  background-color: #F9E9E9; 
  border-color: #FFBABA; 
}

.freguesia-card.high:hover { 
  background-color: #F9F3E9; 
  border-color: #FFDFBA; 
}

.freguesia-card.low:hover { 
  background-color: #EAF9E9; 
  border-color: #BEFFBA; 
}

.freguesia-card.medium:hover { 
  background-color: #FCF9E9; 
  border-color: #FFEBAA; 
}

.card-info { 
  display: flex; 
  flex-direction: column; 
  max-width: 65%; 
}

.freguesia-name { 
  font-weight: 600; 
  font-size: 0.9rem; 
  color: #333; 
  margin-bottom: 2px; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.freguesia-sub { 
  font-size: 0.7rem; 
  color: #aaa; 
}

.freguesia-sub.secondary { 
  color: #888; 
}

.card-stats { 
  display: flex; 
  flex-direction: column; 
  align-items: flex-end; 
}

.stat-value { 
  font-weight: 700; 
  font-size: 1rem; 
}

.stat-label { 
  font-size: 0.65rem; 
  color: #aaa; 
}

.stat-value.critical { color: #c0392b; }
.stat-value.high     { color: #d35400; }
.stat-value.medium   { color: #d4ac0d; }
.stat-value.low      { color: #27ae60; }
</style>