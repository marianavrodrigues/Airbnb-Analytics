<script setup>
import dados from '@/assets/images/icons_elementos/dados.png'
import ficheiros from '@/assets/images/icons_elementos/ficheiros.png'
import objetivo from '@/assets/images/icons_elementos/objetivo.png'

import Footer from '@/components/Footer.vue'
import AboutCard from '@/components/AboutCard.vue'
import FeatureAboutCard from '@/components/FeatureAboutCard.vue'

const aboutCards = [
  {
    icon: dados,
    title: 'Fonte de dados',
    text:
      'Os dados utilizados nesta aplicação provêm da plataforma InsideAirbnb.com, um projeto independente que recolhe e analisa informação pública disponibilizada pelo Airbnb.'
  },
  {
    icon: ficheiros,
    title: 'Ficheiros disponibilizados (em formato CSV e JSON)',
    text:
      'Os gráficos podem ser exportados em PDF ou partilhados nas redes sociais. Além disso, os dados utilizados na sua elaboração estão disponíveis para download em formato CSV ou JSON.'
  },
  {
    icon: objetivo,
    title: 'O nosso objetivo',
    text:
      'O nosso objetivo é facilitar a visualização e interpretação dos dados do InsideAirbnb, permitindo que investigadores e associações compreendam como o crescimento do Alojamento Local (AL) afeta o mercado habitacional urbano.'
  }
]

const features = [
  {
    title: 'Explorar cidades',
    text: 'Analisa dados de Alojamento Local por cidade, vizinhança, tipologia e faixa de preços.'
  },
  {
    title: 'Visualizar tendências',
    text: 'Acompanha a evolução de preços, ocupação e oferta ao longo do tempo.'
  },
  {
    title: 'Mapa interativo',
    text: 'Observa a distribuição geográfica das listagens e zonas em destaque.'
  },
  {
    title: 'Comparar cidades',
    text: 'Compara indicadores-chave entre diferentes cidades, vizinhanças em períodos específicos.'
  }
]
</script>

<template>
  <div class="sobre-page">
    <div class="sobre-wrapper">
      <h1 class="titulo">Sobre o projeto Airbnb Analytics:</h1>

      <section class="about-stack">
        <AboutCard
          v-for="(card, index) in aboutCards" :key="index"
          :icon="card.icon"
          :title="card.title"
          :text="card.text"
        />
      </section>

      <h2 class="sec-title">O que podes fazer nesta plataforma:</h2>

      <section class="features">
        <FeatureAboutCard v-for="(feature, index) in features" :key="index" 
                          :title="feature.title" 
                          :text="feature.text"
        />
      </section>

      <div class="footer-container">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped>

.sobre-page{
  width: 100%;
  min-height: 100vh;
  background: #f6f6f6;
  padding: 120px 20px 50px;
}

.sobre-wrapper{
  width: min(980px, 100%);
  margin: 0 auto;
}

.titulo{
  margin: 10px 0 26px;
  font-size: 2rem;
  font-weight: 700;
  color: #444;
  text-align: center;
}

.about-stack{
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.sec-title {
  margin: 32px 0 14px 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #444;
}

.features{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.footer-container {
  margin-top: 50px;
}

@media (max-width: 700px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
