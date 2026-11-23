<script setup>
import { RouterLink } from 'vue-router'
import ajudapng from '@/assets/images/ajuda.png'
</script>

<template>
  <RouterLink to="/ajuda" class="btn-ajuda-flutuante">
    <img :src="ajudapng" alt="Ajuda">
  </RouterLink>
</template>

<style scoped>
.btn-ajuda-flutuante {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 2000;
  
  display: flex;
  justify-content: center;
  align-items: center;

  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.4));
  
  transition: transform 0.3s ease;
}

.btn-ajuda-flutuante img {
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.btn-ajuda-flutuante:hover {
  transform: scale(1.1);
}
</style>