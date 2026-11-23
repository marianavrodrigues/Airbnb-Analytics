# Análise da Proposta de Interface

## Link para o protótipo Figma:
   https://www.figma.com/design/FzsemcSxO1zHe19PFMea7b/Sem-t%C3%ADtulo?node-id=0-1&t=jgMZfp95smZGDnHk-1


## Consideração das Guidelines de Usabilidade
1. Visibilidade do estado do sistema
  - Após uma pesquisa filtrada o componente de filtragem permanece aberto ainda com os parâmetros preenchidos para o utiizador saber o que está a observar.
  - Quando um filtro é aplicado, os gráficos e indicadores são imediatamente atualizados.
  - Os botões do Menu de Navegação (topo da página) têm uma cor diferente para indicar em que página o utilizador está.
      Ex: Se o utilizador estiver na página "Dados Comparativos" o botão Dados Comparativos terá uma cor diferente dos demais.

2. Correspondência entre o sistema e o mundo real
  - Utilização de linguagem do utilizador em vez de termos técnicos: Preço Médio/noite (em vez de avg_price_per_listing) ou Taxa de Ocupação (em vez de ocup_rate).
  - Estrutura semelhante a dashboards comuns.

3. Controlo e liberdade do utilizador
  - Navegção entre páginas ("Mapa Interativo", "Dados Comparativos") permite sair de qualquer página que tenha sido aberta por engano.
  - Botão "Limpar Filtros" permite redefinir as seleções de parâmetros de pesquisa.

4. Consistência e padrões
  - Mesmo Menu de Navegação em todas as páginas (design e funcionamento idênticos).
  - Cores consistentes: Cards informativos com ícones azuis como o Menu de Navegação, tal como comparações a verde para positivo, vermelho para negativo e amarelo para neutro.
  - Todos os cards informativos e gráficos com o mesmo tamanho, sombra e posicionamento do ícone.
  - Todos os botões com o mesmo formato, cores e hover.
  - Todos os componentes (DropDowns, Faixa de Preço, UpDowns, Spin Box) com a mesma formatação (Parâmetros a negritos após serem selecionados, altura, ícones, etc.).

5. Prevenção de erros
  - Componentes de input com limites (Faixa de Preços mínima/máxima).
  - DropDowns em vez de texto livre para seleção de Cidades/Bairros.

6. Reconhecimento em vez de recordação
  - Os menus suspensos mostram todas as opções possíveis (“Cidade”, “Bairro”, “Tipo de Propriedade”).
  - Ícones e rótulos nos botões ajudam na identificação (“Aplicar Filtros”, “Obter Comparação”).
  - O botão de ajuda “?” aparece em várias páginas para consulta imediata.

7. Flexibilidade e eficiência de utilização
  - Capacidade de trocar de página com apenas um Click no Menu de Navegação.
  - Possibilidade de aplicar vários filtros simultaneamente para análises complexas.
  - Botões de exportação rápida (“CSV”, “JSON”) permitem que utilizadores avançados levem os dados para outras ferramentas.
  - Gráficos e Cards com dados gerais da zona de pesquisa de fácil compreensão.
  - Secção "Alertas e destaques" expansivel de modo a poder mostrar mais cards sem ocupar tanto espaço.

8. Design estético e minimalista
  - Fundo branco e sem poluição visual.
  - Cada gráfico foca num indicador específico, sem muita complexidade para uma leitura fácil.
  - Componentes simples e consistentes (sem decorações desnecessárias).
  - Ícones informativos, chamativos e simples.
  - Estrutura das páginas pouco elaborada para minimizar a quantidade de distrações.

9. Ajudar os utilizadores a reconhecer, diagnosticar e recuperar de erros
  - Uso de pop-ups quando um utilizador comete algum erros ao selecionar os filtros de pesquisa.
      Ex: Data de Fim do filtro é anterior á Data de Inicio
  - Design claro de pop-ups de erro (Overlay branco com a paágina sombreada no fundo, ícone a vermelho para indicar que é um erro e texto informativo).

10. Ajuda e documentação
  - Página "Ajuda" que explica passo a passo como usar a interface, acessível através no botão "?" no canto inferior direito de cada página.
  - Secção FAQ com perguntas comuns (“De onde vêm os dados?”, “Como interpretar os alertas?”).



## Reposta às necessidades dos utilizadores
Perfil 1 - José Silva (Investigador de Pós-Doutoramento)
Necessidades: análises temporais detalhadas, filtros complexos, exportação de dados (CSV/JSON).
  1. A página Estatísticas Cidade inclui gráficos temporais (séries mensais) com dados de preço, listagens e ocupação — permitindo comparar tendências ao longo de vários meses.
  2. O painel de filtros avançados permite combinações complexas de parâmetros (tipo de propriedade, faixa de preço, período de análise e bairro).
  3. Os botões de exportação (“CSV”, “JSON”) que aparecem ao clicar no botão no canto superior direito de um gráfico, garantem a extração direta de dados limpos e prontos para análise externa.

Perfil 2 — Maria Santos (Vereadora do Urbanismo)
Necessidades: dashboards executivos, alertas automáticos, mapas por zonas.
  1. A página Estatísticas Cidade apresenta um dashboard executivo com cards — “Total de Listagens”, “Taxa de Ocupação”, “Anfitriões Ativos” — que permitem leitura rápida de indicadores.
  2. A secção Alertas e Destaques mostra automaticamente anomalias relevantes (“Alta Ocupação”, “Preços acima da média”, “Habitação e AL”), que se alinham diretamente com a necessidade de identificar situações de potencial irregularidade (>300 dias/ano).
  3. O Mapa Interativo apresenta os alojamentos por freguesia e zona da cidade, permitindo inspeção visual e geográfica das áreas críticas, e disponibiliza alertas ao clicar nos pontos marcados.
  4. As cores tornam a leitura mais rápida — vermelho destaca alertas, verde indica normalidade — ajudando a perceber onde agir primeiro.

Perfil 3 — António Costa (Estudante e Ativista)
Necessidades: visualizações simples e impactantes, comparações rápidas, partilha em redes sociais.
  1. Os gráficos comparativos e cards coloridos foram desenhados com foco na comunicação visual imediata (contraste forte, legendas diretas e ícones intuitivos).
  2. A página Dados Comparativos permite comparar cidades ou bairros, produzindo tabelas claras e fáceis de interpretar.
  3. O sistema integra botões de partilha (“Facebook”, “Instagram”, “Twitter”) e exportação direta, permitindo partilhar facilmente os gráficos em redes sociais.

