<script setup>
const model = defineModel({
  type: Object,
  default: () => ({
    cidade: '',
    vizinhanca: '',
    inicio: '',
    fim: ''
  })
})

defineProps({
  titulo: { type: String, default: '' }
})
</script>

<template>
  <fieldset class="localizacao">
    <div class="localizacao-header">
        <h2>{{ titulo }}</h2>
    </div>

    <label>Cidade</label>
    <select v-model="model.cidade">
      <option value="">Escolher</option>
      <option value="Porto">Porto</option>
      <option value="Lisboa">Lisboa</option>
      <option value="Madrid">Madrid</option>
    </select>

    <label>Vizinhança</label>
    <input v-model="model.vizinhanca" />

    <label>Período</label>
    <div class="periodo">
    <input type="date" v-model="model.inicio" />
    <input type="date" v-model="model.fim" />
    </div>
  </fieldset>
</template>


<style scoped>
.localizacao {
  background: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  padding: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  width: 420px;
  max-width: 100%;
}

.localizacao-header {
  padding: 0px 0px 8px 0px;
  font-size: 16px;
  font-weight: 700;
  color: #444;
}

.localizacao label {
  display: block;
  margin-top: 14px;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #555;
}

.localizacao input,
.localizacao select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cfcfcf;
  border-radius: 8px;
  font-size: 13px;
  background: #f7f7f7;
  box-sizing: border-box;
}

.localizacao input:focus, .localizacao select:focus {
  border-color: #2d6e72;
  background: #fff;
}

.periodo {
  display: flex;
  gap: 12px;
}

.periodo input {
  flex: 1;
}

@media (max-width: 500px) {
  .localizacao {
    width: 100%;
    padding: 20px;
  }

  .periodo {
    flex-direction: column;
  }
}

</style>