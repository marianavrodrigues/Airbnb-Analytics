<script setup>
import filtropng from '@/assets/images/icons_elementos/filtro.png'
import { useFiltrosStore} from '@/state/state'
import { ref, onMounted } from 'vue'

const store = useFiltrosStore()
const emit = defineEmits(['aplicar'])

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

onMounted(() => {
  filtros.value = {
    cidade: store.filtros.cidade,
    vizinhanca: store.filtros.vizinhanca,
    tipo: store.filtros.tipo,
    precoMin: store.filtros.precoMin,
    precoMax: store.filtros.precoMax,
    disponibilidade: store.filtros.disponibilidade,
    inicio: store.filtros.inicio,
    fim: store.filtros.fim
  }
})

function validarFiltros(){
  if (filtros.value.inicio && filtros.value.fim) {
    const dataInicio = new Date(filtros.value.inicio)
    const dataFim = new Date(filtros.value.fim)

    if (dataInicio > dataFim) {
      store.showError("A data de início não pode ser posterior à data de fim!")
      return false
    }
  }
  return true
}

function aplicar() {
  if (filtros.value.inicio && filtros.value.fim) {
    const dataInicio = new Date(filtros.value.inicio)
    const dataFim = new Date(filtros.value.fim)

    if (dataInicio > dataFim) {
      store.showError("A data de início não pode ser posterior à data de fim!")
      return;
    }
  }
  
  store.mudarFiltros(filtros.value)
  // REMOVIDO: emit('aplicar')
}

function limparFiltros() {
  filtros.value = {
    cidade: 'Porto',
    vizinhanca: '',
    tipo: '',
    precoMin: '',
    precoMax: '',
    disponibilidade: '',
    inicio: '',
    fim: ''
  }
  store.limparFiltro()
}
</script>

<template>
  <div id="filtro">
    <div id="titulo-filtro">
      <img :src="filtropng" alt="Icone Filtro">
      <h2>Filtros</h2>
    </div>

    <form id="filtros-form" @submit.prevent="aplicar">
      <label for="cidade">Cidade</label>
      <select id="cidade" name="cidade" v-model="filtros.cidade">
        <option value="Porto">Porto</option>
        <option value="Lisboa">Lisboa</option>
        <option value="Madrid">Madrid</option>
      </select>

      <label for="vizinhanca">Vizinhanca</label>
      <input id="vizinhanca" name="vizinhanca" placeholder="Ex: Baixa, Centro..." v-model="filtros.vizinhanca" />

      <label for="tipo">Tipo de Propriedade</label>
      <select id="tipo" name="tipo" v-model="filtros.tipo">
        <option value="">Qualquer</option>
        <option value="Casa/Apartamento">Casa/Apartamento</option>
        <option value="QuartoPrivado">Quarto Privado</option>
        <option value="QuartoPartilhado">Quarto Partilhado</option>
      </select>

      <label>Faixa de Preços</label>
      <div class="input-group">
        <input name="precoMin" type="number" placeholder="Min." v-model="filtros.precoMin" />
        <input name="precoMax" type="number" placeholder="Máx." v-model="filtros.precoMax" />
      </div>

      <label>Disponibilidade Mínima (dias/ano)</label>
      <input type="number" name="disponibilidade" v-model="filtros.disponibilidade" />

      <label>Período de Análise</label>
      <input type="date" name="inicio" v-model="filtros.inicio" />
      <input type="date" name="fim" v-model="filtros.fim" />

      <button type="submit" id="aplicar">Aplicar Filtros</button>
      <button type="button" id="limpar" @click="limparFiltros">Limpar Filtros</button>
    </form>
  </div>
</template>

<style scoped>
    #filtro {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 12px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        height: fit-content;
    }

    #titulo-filtro{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #ddd;
    }

    #titulo-filtro h2{
        font-size: 24px;
        margin: 0;
    }

    #titulo-filtro img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }

    #filtros-form {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    #filtros-form label {
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: -5px; 
    }

    #filtros-form input,
    #filtros-form select,
    #filtros-form button {
        padding: 0.6rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 0.9rem;
        width: 100%;
        box-sizing: border-box;
    }

    .input-group {
        display: flex;
        gap: 10px;
    }

    #aplicar {
        background-color: #2d6e72;
        color: white;
        cursor: pointer;
        border: none;
        transition: 0.2s;
        margin-top: 10px;
        font-weight: 600;
    }

    #aplicar:hover {
        background-color: #255c5f;
    }

    #limpar {
        background-color: #8DC5CE;
        color: #00363d;
        cursor: pointer;
        border: none;
        transition: 0.2s;
        font-weight: 600;
    }

    #limpar:hover {
        background-color: #7cb5bd;
    }
</style>