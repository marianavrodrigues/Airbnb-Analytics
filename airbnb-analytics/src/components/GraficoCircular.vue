<script>
import { Pie } from 'vue-chartjs'
import '@/plugins/chart.js'
import BotaoShare from './BotaoShare.vue'

export default {
  name: 'GraficoCircular',
  components: { 
    Pie,
    BotaoShare 
  },
  props: {
    labels: Array,
    valores: Array,
    cores: { 
        type: Array, 
        default: () => ['#FF6384', '#36A2EB', '#FFCE56'] 
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.valores,
            backgroundColor: this.cores,
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false
      }
    },

    exportData() {
      return {
        labels: this.labels,
        values: this.valores
      }
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <div class="chart-header">
      <div class="header-slot">
        <slot name="header"></slot>
      </div>
      
      <BotaoShare 
        :chartData="exportData" 
        chartTitle="Distribuição" 
      />
    </div>

    <div class="chart-inner">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header-slot {
  font-weight: 600;
  color: #444;
}

.chart-inner {
  position: relative;
  height: 260px;
}
</style>