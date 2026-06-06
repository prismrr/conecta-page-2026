## 🌀 Definição do Conceito

### Nome do Conceito

**PRISM Conecta Hub** (ou simplesmente **Conecta Hub**)

### Pitch em Uma Frase

O portal definitivo, dinâmico e acessível que centraliza a experiência, a programação e o engajamento do evento Conecta na palma da mão do usuário.

### Problema Principal

A dispersão de informações e a dificuldade de acesso rápido à agenda e atualizações em tempo real de eventos tecnológicos, o que gera ruído na comunicação e reduz o engajamento do público local antes e durante a experiência.

### Conceito e Escopo

O **Conecta Hub** é uma plataforma web estática de alta performance, projetada para ser o ponto central de contato do evento. O escopo abrange desde o fornecimento de informações institucionais e localização geográfica até uma agenda interativa e um fluxo simplificado de conversão para inscrições.

* **Público-Alvo:** Comunidade acadêmica (professores, pesquisadores, estudantes), entusiastas de tecnologia, parceiros institucionais e a comunidade local de Roraima.
* **Abordagem de Design:** Foco absoluto na jornada do usuário, garantindo que a informação crucial (O que é? Onde é? Quando acontece?) seja acessada em menos de três cliques.

### Diferencial Competitivo

Performance extrema e sustentabilidade digital. Ao utilizar uma arquitetura Jamstack com Jekyll, o site entrega um carregamento instantâneo mesmo em redes móveis limitadas, aliado a uma interface de alto impacto visual (modo escuro/claro nativo com acentos vibrantes) e zero fricção de navegação, destacando-se de portais institucionais pesados e tradicionais.

### Pré-requisitos Técnicos

Para o desenvolvimento e manutenção do ecossistema do projeto, a equipe deverá dominar:

* **Front-end básico:** HTML5 estruturado e semântico, CSS3 (com foco em variáveis para controle de temas) e JavaScript moderno.
* **Gerador de Sites Estáticos:** Ruby e Jekyll (estrutura de dados em YAML/Front Matter, layouts e inclusões).
* **Infraestrutura Local:** Docker e Docker Compose para padronização do ambiente de desenvolvimento.

---

## 🚀 Marcos do Projeto (Milestones)

```
[M1: Wireframes] ──> [M2: Protótipo UI/UX] ──> [M3: Configuração Docker]
                                                       │
[M6: UAT & Launch] <── [M5: Testes & QA] <── [M4: Sprints de Dev]
       │
[M7: Operação & Evolução]

```

### M1: Wireframes & Fluxo do Usuário (Arquitetura de Informação)

* **Entrega:** Esboços de baixa fidelidade (Lo-Fi) cobrindo a arquitetura de página única (*Landing Page*) e a página interna/módulo da Agenda.
* **Foco:** Validar a disposição das informações (Seção Inicial -> Notícias -> Localização -> Chamada para Inscrição) e o comportamento responsivo para dispositivos móveis.

### M2: Protótipo Funcional (UI/UX)

* **Entrega:** Protótipo de alta fidelidade no Figma, aplicando o estilo visual definido (Modo Escuro como padrão, alternância para Modo Claro, uso de cores vibrantes/neon para destacar elementos de ação como botões de inscrição e filtros).
* **Foco:** Testar a legibilidade do contraste, transições de tema e a intuição dos filtros de busca da agenda.

### M3: Configuração do Ambiente (Backend & Infraestrutura)

* **Entrega:** Repositório Git estruturado com um ambiente conteinerizado via `docker-compose.yml`.
* **Foco:** Garantir que qualquer membro da equipe suba o servidor Jekyll localmente com um único comando (`docker-compose up`), padronizando as versões do Ruby e das Gems necessárias, eliminando o problema do "na minha máquina funciona".

### M4: Desenvolvimento dos Módulos (Sprints de Dev)

* **Sprint 1 (Core & Theme):** Estrutura base do Jekyll, configuração de coleções para notícias/agenda e implementação do motor de troca de estilo visual (Dark/Light mode).
* **Sprint 2 (Home & Info):** Desenvolvimento da página inicial (Descrição, Painel de Notícias Dinâmicas integrado via Markdown e seção de Localização com mapa responsivo).
* **Sprint 3 (Interatividade & Inscrição):** Implementação da página da Agenda com sistema de busca/filtro em tempo real (via JavaScript leve sobre os dados gerados pelo Jekyll) e página/seção com o passo a passo de inscrição.

### M5: Testes de Usabilidade e Desempenho

* **Entrega:** Relatório de otimização e homologação técnica.
* **Foco:** Validação de acessibilidade (contraste de cores), validação do HTML semântico, testes de carregamento (Lighthouse score > 90) e comportamento dos filtros em navegadores mobile variados.

### M6: Teste de Aceitação do Usuário (UAT) & Deploy

* **Entrega:** Homologação final junto à coordenação do evento e publicação em ambiente de produção (ex: GitHub Pages, Vercel ou servidor institucional).
* **Foco:** Garantir que os dados da programação estejam 100% corretos e que o fluxo de conversão para as inscrições externas esteja operacional.

### M7: Operação e Manutenção

* **Entrega:** Plantão de atualização durante os dias do evento.
* **Foco:** Atualização rápida do painel de notícias para avisos urgentes (mudanças de sala, alertas) e monitoramento de disponibilidade da página.

---

## 🎯 Definição do MVP (Produto Mínimo Viável)

Para acelerar o lançamento da **Versão 1.0** e iniciar a divulgação do evento o quanto antes, o escopo será reduzido ao essencial para gerar valor imediato.

### O que entra no MVP:

1. **Landing Page Responsiva (Modo Escuro Fixo):** Página inicial contendo a descrição essencial do evento e o local (endereço textual e link direto para o Google Maps). *A alternância para modo claro será postergada para a v1.1.*
2. **Seção de Notícias Simplificada:** Feed direto baseado em arquivos Markdown estáticos para comunicados iniciais importantes.
3. **Agenda Estática Filtrável:** Listagem completa das palestras e horários organizada cronologicamente, com um campo de busca simples por texto (via JS).
4. **Call to Action (CTA) para Inscrição:** Link direto e destacado direcionando o usuário para a plataforma oficial de inscrições do evento.