<script>
import { Bar } from 'vue-chartjs'
import '@/plugins/chart.js'
import BotaoShare from './BotaoShare.vue'

export default {
  name: 'GraficoBarras',
  components: { 
    Bar,
    BotaoShare 
  },
  props: {
    labels: { type: Array, required: true },
    valores: { type: Array, required: true },
    titulo: { type: String, default: '' },
    cor: { type: String, default: '#36A2EB' },
    nomesCompletos: { type: Array, default: () => [] }
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.titulo,
            data: this.valores,
            backgroundColor: this.cor,
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: !!this.titulo
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                const index = tooltipItems[0].dataIndex
                if (this.nomesCompletos && this.nomesCompletos.length > index) {
                  return this.nomesCompletos[index]
                }
                return this.labels[index]
              }
            }
          }
        }
      }
    },

    exportData() {
      return {
        labels: (this.nomesCompletos && this.nomesCompletos.length > 0) 
                ? this.nomesCompletos 
                : this.labels,
        values: this.valores
      }
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <div class="chart-header">
       <div class="header-content">
         <slot name="header"></slot>
       </div>
       
       <BotaoShare 
         :chartData="exportData" 
         :chartTitle="titulo || 'Grafico de Barras'" 
       />
    </div>
    
    <div class="chart-inner">
      <Bar :data="chartData" :options="chartOptions" />
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
  display: flex;
  flex-direction: column;
}

.chart-header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  font-weight: 600;
  color: #444;
}

.chart-inner {
  position: relative;
  height: 260px;
  width: 100%;
}
</style>