<script setup>
    import { useFiltrosStore } from '@/state/state';
    import errorpng from '@/assets/images/icons_elementos/erro.png'

    const store = useFiltrosStore();
</script>

<template>
  <div v-if="store.error.active" class="error-overlay" @click="store.hideError">
    <div class="error-box"> 
      <div class="error-header">
        <div class="circulo-icon">
            <img :src="errorpng" width="35px" height="35px">
        </div>
        <h3>Aviso de Erro</h3>
      </div>
      <p>{{ store.error.message }}</p>
      <div class="btn-container">
        <button class="btn-fechar" @click="store.hideError">Entendido</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999; 
}

.error-box {
    background: #FFFFFF;
    padding: 2rem;
    border-radius: 12px;
    max-width: 450px;
    width: 90%;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.error-header{
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 0;
}

.circulo-icon {
  width: 50px;
  height: 50px;
  background-color: #FFBABA;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

h3{
    margin-left: 1rem;
}

.btn-container{
    display: flex;
    justify-content: end;
}

.btn-fechar {
    margin-top: 1.5rem;
    background-color: #2d6e72;
    color: white;
    border: none;
    padding: 0.6rem 2rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
}
</style>