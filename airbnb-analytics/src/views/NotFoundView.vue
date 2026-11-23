<script setup>
    import lupapng from '@/assets/images/icons_elementos/lupa.png'
    import casa from '@/assets/images/icons_elementos/casabranca.png'
    import Footer from '@/components/Footer.vue'

    import { useRouter } from 'vue-router'

    const router = useRouter()

    function voltarInicio(){
        router.push('/home')
    }
</script>

<template>
  <div class="notfound-page">
    <h1 class="bg-404">404</h1>

    <div class="notfound-content">
      <div class="notfound-box">
        <img :src="lupapng" class="lupa-icon" alt="Lupa">
        <p>Página não encontrada</p>
      </div>

      <div class="info-section">
        <h1>Oops! Esta página não existe</h1>
        <p>
          A página que procura pode ter sido removida, renomeada<br> 
          ou está temporariamente indisponível.
        </p>
      </div>

      <div class="button-group">
        <button class="btn" @click="voltarInicio">
          <img :src="casa" class="casa-icon"> Voltar ao Início
        </button>
      </div>
    </div>

    <div class="footer-container">
        <Footer />
    </div>

  </div>
</template>

<style scoped>
.notfound-page {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.bg-404 {
  position: absolute;
  font-size: 25rem;
  font-weight: 900;
  color: #f0f0f0; 
  z-index: 1;
}

.notfound-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2; 
  text-align: center;
  gap: 2rem;
}

.notfound-box {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.lupa-icon {
  width: 50px;
  height: 50px;
}

.casa-icon{
  width: 20px;
  height: 20px;
}

.notfound-badge p {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
}

.info-section h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.info-section p {
  color: #666;
  line-height: 1.6;
  font-size: 1.1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
} 

.btn{
  background-color: #2d6e72;
  color: white;
  border: none;
}

.btn:hover {
  background-color: #255c5f;
}

.footer-container {
  padding-bottom: 2rem;
  display: flex;
  justify-content: center;
}

</style>