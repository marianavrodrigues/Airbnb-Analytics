<script setup>
import { ref } from 'vue'
import user from '@/assets/images/icons_ajuda/user.png'
import filtros from '@/assets/images/icons_ajuda/filtros.png'
import indicadores from '@/assets/images/icons_ajuda/indicadores.png'
import alertas from '@/assets/images/icons_ajuda/alertas.png'
import dados from '@/assets/images/icons_ajuda/dados.png'
import lupa from '@/assets/images/icons_ajuda/lupa.png'
import Footer from '@/components/Footer.vue'


const faqs = [
  {
    q: 'De onde vêm os dados apresentados?',
    a: 'Os dados provêm da plataforma InsideAirbnb.com, um projeto independente que recolhe informação pública disponibilizada pelo Airbnb. A base é atualizada trimestralmente e cobre mais de 200 cidades globalmente.'
  },
  {
    q: 'Com que frequência os dados são atualizados?',
    a: 'A plataforma InsideAirbnb Analytics atualiza os dados a cada três meses. A data da última atualização está indicada no rodapé das diversas páginas.'
  },
  {
    q: 'O que significa "Rácio AL/Hab"?',
    a: 'O "Rácio AL/Hab" (Alojamento Local por Habitação) indica a proporção entre o número de alojamentos locais (AL) e as habitações numa determinada área. Um rácio elevado pode indicar pressão sobre o mercado habitacional local.'
  },
  {
    q: 'Posso usar estes dados para investigação académica?',
    a: 'Sim! Esta plataforma foi desenvolvida para facilitar o acesso e interpretação dos dados públicos do InsideAirbnb para fins de investigação, estudos académicos e análise de políticas públicas.'
  },
  {
    q: 'Como interpretar os alertas de "Alta ocupação"?',
    a: 'Os alertas de alta ocupação identificam freguesias onde mais de 30% das habitações estão listadas como AL ou onde a ocupação média anual excede 70%. Estas áreas podem estar com mais desafios relacionados à escassez habitacional.'
  },
  {
    q: 'O que fazer se encontrar um erro nos dados?',
    a: 'Como os dados são recolhidos pelo projeto InsideAirbnb, eventuais erros ou questões sobre os dados devem ser reportados diretamente à equipa do InsideAirbnb através do seu site oficial, InsideAirbnb.com.'
  }
]

const openIndex = ref(-1)

function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>


<template>
  <div class="ajuda-page">
    <div class="ajuda-wrapper">
      <h1 class="titulo">Como podemos ajudar?</h1>
      <p class="subtitulo">
        Encontre respostas rápidas sobre como usar a plataforma InsideAirbnb Analytics
      </p>

      <section class="help-panel">
        <div class="help-head">
          <div class="help-badge">
            <img :src="user" alt="Como usar a plataforma" />
          </div>
          <h2 class="help-title">Como usar a plataforma?</h2>
        </div>

        <div class="steps">
          <div class="step">
            <div class="step-icon">
              <img :src="filtros" alt="Filtros" />
            </div>
            <div>
              <h3>1. Utilize os Filtros</h3>
              <p>
                Na barra lateral esquerda, pode filtrar dados por freguesia, tipo de propriedade,
                faixa de preço e período temporal. Os gráficos e os dados atualizam automaticamente.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-icon">
              <img :src="indicadores" alt="Indicadores" />
            </div>
            <div>
              <h3>2. Explore os Indicadores de Desempenho</h3>
              <p>
                No topo do dashboard, encontra indicadores-chave como total de alojamentos,
                população, rácios e freguesias mais impactadas.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-icon">
              <img :src="alertas" alt="Alertas" />
            </div>
            <div>
              <h3>3. Consulte os Alertas</h3>
              <p>
                Os alertas destacam áreas com alta ocupação de AL, impactos no mercado habitacional
                e outros pontos críticos de atenção.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-icon">
              <img :src="dados" alt="Exportar" />
            </div>
            <div>
              <h3>4. Exporte os Dados</h3>
              <p>
                Use os botões <b>"CSV"</b> ou <b>"JSON"</b> através dos botões de partilha seguido de download,
                para descarregar os dados filtrados para análise externa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="faq-panel">
      <h2 class="faq-title">Perguntas Frequentes</h2>

      <div class="faq-list">
        <div v-for="(item, i) in faqs" :key="item.q" class="faq-item" :class="{ open: openIndex === i }">
          <button class="faq-question" type="button" @click="toggle(i)">
            <span>{{ item.q }}</span>

            <svg class="seta" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div v-show="openIndex === i" class="faq-answer">
            {{ item.a }}
          </div>
        </div>
      </div>
    </section>

    <section class="help-end">
      <div class="help-end-card">
        <div class="help-end-icon">
          <img :src="lupa" alt="Ajuda" />
        </div>

        <h2 class="help-end-title">Não encontrou o que procurava?</h2>

        <p class="help-end-subtitle">
          Para mais informações sobre a origem dos dados e metodologia, visite a página "Sobre" ou consulte
          diretamente o site InsideAirbnb.com
        </p>

        <div class="help-end-actions">
          <a href="/sobre" class="help-end-btn">Sobre o Projeto</a>
          <a href="https://insideairbnb.com" target="_blank" rel="noopener" class="help-end-btn">
            InsideAirbnb.com
          </a>
        </div>
      </div>

      <a href="javascript:history.back()" class="help-back-btn">Voltar</a>
    </section>


    <div class="footer-container">
      <Footer />
    </div>
    </div>
  </div>
</template>

<style scoped>
.ajuda-page{
  padding-top: 120px;
  padding-left: 24px;
  padding-right: 24px;
}

.ajuda-wrapper{
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.titulo{
  max-width: 1200px;
  margin: 0 auto 40px auto;
  font-size: 40px;
  font-weight: 700;
  color: #636363;
}

.subtitulo{
  margin: 0 auto 26px auto;
  max-width: 720px;
  color: #666666;
  font-size: 20px;
}

.help-panel{
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  text-align: left;
}

.help-head{
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.help-badge{
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: #2f7f8c;
  display: grid;
  place-items: center;
  flex: 0 0 46px;
}

.help-badge img{
  width: 22px;
  height: 22px;
}

.help-title{
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  color: #636363;
}

.steps{
  display: grid;
  gap: 16px;
  padding: 4px 6px 8px;
}

.step{
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 14px;
  align-items: start;
}

.step-icon{
  width: 45px;
  height: 45px;
  background-color: #CEE6EA; 
  border-radius: 50%;        
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-icon img{
  width: 24px;  
  height: 24px;
  display: block;
}

.step h3{
  margin: 0 0 4px 0;
  font-size: 1rem;
  font-weight: 700;
  color: #636363;
}

.step p{
  margin: 0;
  font-size: 0.95rem;
  color: #636363;
  line-height: 1.35rem;
}


.faq-panel{
  margin-top: 26px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  padding: 18px 18px 8px;
  text-align: left;
}

.faq-title{
  margin: 4px 6px 10px;
  font-size: 2rem;
  font-weight: 800;
  color: #636363;
}

.faq-list{
  border-top: 1px solid #dcdcdc;
  margin-top: 10px;
}

.faq-item{
  border-bottom: 1px solid #dcdcdc;
}

.faq-question{
  width: 100%;
  background: transparent;
  border: 0;
  padding: 12px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;         
  font-weight: 600;       
  color: #595959;           
}

.faq-answer{
  padding: 0 6px 12px 6px;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;         
  font-weight: 400;        
  color: #8a8a8a;           
  line-height: 1.35;
}

.seta {
  width: 22px;
  height: 22px;
  color: #B7B7B7;
  flex-shrink: 0;
  transition: transform 0.3s ease; 
}

.faq-item.open .seta{
  transform: rotate(180deg);
}

.help-end{
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
}

.help-end-card{
  width: 100%;
  background: #D6EEF1;            
  border: 1px solid #dcdcdc;      
  border-radius: 12px;           
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08); 
  padding: 34px 22px;
  text-align: center;
}

.help-end-icon{
  width: 62px;
  height: 62px;
  border-radius: 12px;
  background: #79BFC6;            
  display: grid;
  place-items: center;
  margin: 0 auto 14px auto;
}

.help-end-icon img{
  width: 36px;
  height: 36px;
}

.help-end-title{
  margin: 0 0 10px 0;
  font-size: 32px;
  font-weight: 700;
  color: #636363;
}

.help-end-subtitle{
  margin: 0 auto 18px auto;
  max-width: 720px;
  font-size: 16px;
  color: #7b7b7b;
  line-height: 1.35;
}

.help-end-actions{
  display: flex;
  justify-content: center;
  gap: 22px;
  flex-wrap: wrap;
}

.help-end-btn{
  background: #79BFC6;
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  font-size: 22px;
  padding: 14px 34px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.help-back-btn{
  background: #79BFC6;
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  font-size: 22px;
  padding: 14px 60px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 720px){
  .help-end-title{ font-size: 26px; }
  .help-end-btn, .help-back-btn{ font-size: 18px; padding: 12px 26px; }
}

@media (max-width: 720px){
  .titulo{ font-size: 2.1rem; }
  .help-title{ font-size: 1.6rem; }
}
</style>
