import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFiltrosStore = defineStore('filtros', () => {

  const filtros = ref({
    cidade: 'Porto',
    vizinhanca: '',
    tipo: '',
    precoMin: '',
    precoMax: '',
    disponibilidade: '',
    inicio: '',
    fim: ''
  })

  function mudarFiltros(novos) {
    filtros.value = {
      cidade: novos.cidade,
      vizinhanca: novos.vizinhanca,
      tipo: novos.tipo,
      precoMin: novos.precoMin,
      precoMax: novos.precoMax,
      disponibilidade: novos.disponibilidade,
      inicio: novos.inicio,
      fim: novos.fim
    }
  }

  function limparFiltro() {
    filtros.value = {
      cidade: '',
      vizinhanca: '',
      tipo: '',
      precoMin: '',
      precoMax: '',
      disponibilidade: '',
      inicio: '',
      fim: ''
    }
  }

  //TRATAMENTO DE ERROS
  const error = ref({ 
    active: false, 
    message: '' 
  })

  function showError(msg) {
    error.value = {
      active: true, 
      message: msg 
    }
  }
  
  function hideError() {
    error.value.active = false
  }

  return {
    filtros,
    limparFiltro,
    mudarFiltros,
    error, 
    showError, 
    hideError 
  }
})
