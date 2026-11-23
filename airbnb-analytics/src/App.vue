<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useFiltrosStore } from './state/state'
import NavBar from './components/NavBar.vue' 
import BotaoAjuda from './components/BotaoAjuda.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const store = useFiltrosStore()

const showNavbar = computed(() => {
  return route.name !== 'start' 
})
</script>

<template>
  <header v-if="showNavbar">
    <NavBar />
  </header>

  <main>
    <RouterView />
  </main>

  <BotaoAjuda />
</template>

<style>
  @import './assets/main.css';
</style>