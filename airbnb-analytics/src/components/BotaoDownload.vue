<script setup>
import { defineProps, defineEmits } from 'vue'

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

const emit = defineEmits(['close', 'back'])

function triggerDownload(content, mimeType, filename) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function downloadFile(format) {
  const data = props.chartData
  const filename = props.chartTitle.replace(/\s+/g, '_').replace(/[()%]/g, '') + '.' + format.toLowerCase()

  if (format === 'JSON') {
    const jsonStr = JSON.stringify(data, null, 2)
    triggerDownload(jsonStr, 'application/json', filename)
  } 
  else if (format === 'CSV') {
    let csvContent = "Label,Valor\n"

    const labels = data?.labels || []
    const values = data?.values || []
    
    console.log('CSV - Labels length:', labels.length)
    console.log('CSV - Values length:', values.length)
    
    if (labels.length > 0 && values.length > 0) {
      labels.forEach((label, index) => {
        let val = values[index]
        if (val === undefined || val === null) val = 0
        const cleanLabel = String(label).replace(/"/g, '""')
        
        csvContent += `"${cleanLabel}",${val}\n`
      })
    } else {
      console.error('Sem dados para exportar!')
      alert('Erro: Não há dados para exportar')
      emit('close')
      return
    }

    const bom = "\uFEFF"
    triggerDownload(bom + csvContent, 'text/csv;charset=utf-8', filename)
  }
  
  emit('close')
}
</script>

<template>
  <div class="download-container">
    <div class="modal-header">
      <h3>Escolha o formato</h3>
      <button class="close-btn" @click="$emit('close')">×</button>
    </div>
    
    <div class="buttons-row">
      <button class="format-btn" @click="downloadFile('CSV')">CSV</button>
      <button class="format-btn" @click="downloadFile('JSON')">JSON</button>
    </div>

    <div class="modal-footer">
      <span class="back-link" @click="$emit('back')">Voltar</span>
    </div>
  </div>
</template>

<style scoped>
.download-container {
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #444;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
}

.buttons-row {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  margin-bottom: 15px;
}

.format-btn {
  flex: 1;
  padding: 15px 0;
  border: none;
  border-radius: 8px;
  background-color: #3A6D73;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.format-btn:hover {
  background-color: #2c555a;
}

.modal-footer {
  text-align: center;
  margin-top: 10px;
}

.back-link {
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
}
</style>