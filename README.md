# Airbnb Analytics — Plataforma de Análise de Alojamento Local

Projeto desenvolvido para a unidade curricular de Interface Pessoa-Máquina da Licenciatura em Engenharia Informática da Universidade do Minho, no ano letivo 2025/2026.

## Grupo 77

- Diogo Alves Ferreira
- José Manuel Peixoto Rocha
- Mariana Vivas Rodrigues

## Sobre o projeto

O Airbnb Analytics é uma aplicação web que permite explorar e comparar dados de alojamento local em Lisboa, Porto e Madrid, através de uma interface interativa para a análise e visualização de informação.

O projeto foi desenvolvido com especial atenção às 10 heurísticas de Nielsen e aos princípios de usabilidade, procurando facilitar a interpretação dos dados através de dashboards, gráficos, mapas e filtros.

## Funcionalidades principais

- **Dashboard de estatísticas** - consulta de indicadores como o número de alojamentos, o preço médio, a ocupação e a atividade dos anfitriões
- **Filtros de pesquisa** - seleção por cidade, zona, tipo de alojamento, preço e período temporal
- **Gráficos interativos** - visualização de tendências e distribuição dos alojamentos
- **Mapa interativo** - exploração geográfica dos alojamentos e das zonas em destaque
- **Comparação de localizações** - comparação de indicadores entre cidades ou zonas selecionadas
- **Exportação de dados** - disponibilização de dados em formatos como CSV e JSON
- **Ajuda e feedback** - página de ajuda, perguntas frequentes, alertas e mensagens de erro

## Tecnologias utilizadas

- **Vue 3** - desenvolvimento da interface através de componentes reutilizáveis.
- **JavaScript, HTML e CSS** - lógica, estrutura e apresentação da aplicação.
- **Vite** - ambiente de desenvolvimento e compilação.
- **Vue Router** - navegação entre páginas.
- **Pinia** - gestão do estado partilhado, nomeadamente dos filtros.
- **Chart.js e vue-chartjs** - representação de dados em gráficos.
- **Google Maps JavaScript API** - visualização de informação geográfica.
- **JSON Server** - disponibilização local dos dados através de uma API REST simulada.

## Como executar

É necessário ter o Node.js e o npm instalados. A configuração do projeto indica Node.js 20.19+ ou 22.12+

A partir da pasta raiz do repositório, entra na aplicação e instala as dependências:

```bash
cd airbnb-analytics
npm install
```

### Configuração do Google Maps (necessária para visualizar o mapa)

A aplicação utiliza a **Google Maps JavaScript API**, mas **não inclui nenhuma chave real no repositório**. Cada pessoa deve utilizar a sua própria chave (uma Demo Key pode ser usada em desenvolvimento/testes, de acordo com os termos da Google).

1. Na pasta `airbnb-analytics/`, copia o exemplo:

   ```bash
   cp .env.example .env.local
   ```

2. Abre `airbnb-analytics/.env.local` e substitui `SUA_CHAVE_AQUI` pela tua própria chave:

   ```env
   VITE_GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI
   ```

3. Reinicia o servidor Vite depois de alterar `.env.local`.

O `.env.local` está excluído do Git. Se não configurares a chave, as páginas da aplicação continuam acessíveis, mas o mapa mostra uma mensagem de configuração. **A chave é visível no navegador durante a utilização do Google Maps**; por isso, numa chave normal deves limitar os websites autorizados e as APIs permitidas na Google Cloud. Uma Demo Key destina-se apenas a prototipagem/testes, não a produção.

Em seguida, inicia o servidor de dados:

```bash
npx json-server db.json --port 3000
```

**Mantém esse terminal aberto** e, num segundo terminal, a partir da mesma pasta `airbnb-analytics`, inicia a aplicação:

```bash
npm run dev
```

Abre no navegador o endereço local apresentado pelo Vite (habitualmente `http://localhost:5173`).

> **Nota:** não incluas uma chave real em commits ou capturas. Quem descarregar o repositório deverá configurar a sua própria chave.

## Estrutura do projeto

```text
ipm-2526-1s-ipm_grupo_77/
├── airbnb-analytics/
│   ├── public/                 
│   ├── src/
│   │   ├── assets/             
│   │   ├── components/         
│   │   ├── plugins/            
│   │   ├── router/             
│   │   ├── state/             
│   │   ├── views/             
│   │   ├── App.vue            
│   │   └── main.js             
│   ├── db.json                 
│   ├── .env.example            
│   ├── index.html              
│   ├── package.json            
│   └── vite.config.js          
├── analise_interface.md        
└── README.md
```

## Origem dos dados

A aplicação apresenta dados atribuídos ao projeto Inside Airbnb, que disponibiliza conjuntos de dados públicos sobre alojamentos locais. Nesta versão académica, a aplicação utiliza um conjunto de dados local armazenado em `airbnb-analytics/db.json`, e não uma ligação em tempo real à plataforma.
