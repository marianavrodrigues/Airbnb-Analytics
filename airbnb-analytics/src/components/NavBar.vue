<script setup>
  import { RouterLink , useRoute} from 'vue-router'
  import logopng from '@/assets/images/logo.png'

  const route = useRoute();
</script>

<template>
  <nav id="nav" :class="{ 'sem-sombra': route.path === '/' || route.path === '/' }">
    <ul id="lista-nav">
      <RouterLink to="/" custom v-slot="{ navigate }">
        <li @click="navigate" class="nav-item" id="botao-home">
           <img v-bind:src="logopng" alt="Logo">
           Airbnb Analytics
        </li>
      </RouterLink>

      <RouterLink to="/estatisticas" class="nav-item">Pesquisa de Cidade</RouterLink>
      <RouterLink to="/mapa" class="nav-item">Mapa Interativo</RouterLink>
      <RouterLink to="/comparar" class="nav-item">Dados Comparativos</RouterLink>
      <RouterLink to="/sobre" class="nav-item">Sobre</RouterLink>
    </ul>
  </nav>
</template>
<style scoped>
#nav {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    height: 80px;
    background: linear-gradient(to bottom, #337c83 0%, #2d6e72 100%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    box-sizing: border-box;
    transition: box-shadow 0.3s ease;
}

#nav.sem-sombra {
    box-shadow: none;
    border-bottom: none;
}

#nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    width: 100%;
    overflow-x: auto; 
    scrollbar-width: none;
}
#nav ul::-webkit-scrollbar { display: none;}

.nav-item {
    flex: 1;
    display: flex;
    padding: 1.2rem;
    justify-content: center;
    align-items: center;
    color: var(--white-font-color);
    cursor: pointer;
    font-weight: 600;
    text-decoration: none;
    font-size: 20px;
    transition: all ease-in 0.3s;
    border-radius: 12px;
    margin: 0 5px;
    white-space: nowrap;
}

.nav-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.router-link-active {
    background-color: rgba(0, 0, 0, 0.2);
    border-bottom: 4px solid var(--white-font-color);
}

.nav-item.router-link-active {
    background-color: #f5f5f5;
    color: #2d6e72;
    border-radius: 12px 12px 0 0;
    border-bottom: none; 
    position: relative; 
    z-index: 10; 
}

.nav-item.router-link-active::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: #f5f5f5;
}

#nav.sem-sombra .nav-item.router-link-active::after {
    display: none;
}

#botao-home img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

@media (max-width: 900px) {
    #nav {
        padding: 0 10px;
        height: 70px;
    }
    
    .nav-item {
        font-size: 14px;
        padding: 0.8rem;
    }
    
    #botao-home img {
        width: 30px;
        height: 30px;
        margin-right: 5px;
    }
}
</style>