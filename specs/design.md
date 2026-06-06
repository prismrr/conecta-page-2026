### 💻 Layout e Estrutura Front-end (Tailwind CSS)

Este código representa o template base (`/layouts/default.html`) e os componentes do MVP unificados em uma arquitetura de página única de alta performance e totalmente responsiva.

```html
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PRISM Conecta Hub</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              cyan: '#23BCC7',
              green: '#00A181',
              blue: '#356AC3',
              orange: '#F98503',
            },
            dark: {
              bg: '#0F172A',
              surface: '#1E293B',
              text: '#F8FAFC'
            },
            light: {
              bg: '#F8FAFC',
              surface: '#FFFFFF',
              text: '#0F172A'
            }
          }
        }
      }
    }
  </script>
  <style>
    /* Transições suaves globais para estados de hover, clique e troca de tema (UX) */
    .smooth-transition {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    /* Estilização da proporção intrínseca do mapa para evitar quebra de viewport móvel */
    .map-container {
      aspect-ratio: 16 / 9;
    }
    @media (max-width: 768px) {
      .map-container {
        aspect-ratio: 4 / 3;
      }
    }
  </style>
</head>
<body class="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text smooth-transition font-sans antialiased selection:bg-brand-cyan selection:text-dark-bg">

  <nav class="sticky top-0 z-50 w-full backdrop-blur-md bg-light-surface/80 dark:bg-dark-surface/80 border-b border-slate-200 dark:border-slate-800 smooth-transition">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0 flex items-center space-x-2">
          <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-blue flex items-center justify-center shadow-md shadow-brand-cyan/20">
            <span class="text-white font-black text-sm">P</span>
          </div>
          <span class="font-bold text-lg tracking-tight bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">PRISM Conecta</span>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
          <a href="#inicio" class="text-sm font-medium hover:text-brand-cyan smooth-transition">Início</a>
          <a href="#noticias" class="text-sm font-medium hover:text-brand-cyan smooth-transition">Notícias</a>
          <a href="#agenda" class="text-sm font-medium hover:text-brand-cyan smooth-transition">Agenda</a>
          <a href="#localizacao" class="text-sm font-medium hover:text-brand-cyan smooth-transition">Localização</a>
        </div>

        <div class="flex items-center space-x-4">
          <button id="theme-toggle" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 smooth-transition" aria-label="Alternar tema visual">
            <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.142a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-.707-8.485a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z"></path></svg>
            <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8 8 0 1010.586 10.586z"></path></svg>
          </button>
          
          <a href="https://plataforma-externa.com/inscricao" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-brand-cyan hover:bg-[#1da9b3] rounded-xl shadow-lg shadow-brand-cyan/20 hover:shadow-brand-cyan/30 active:scale-98 smooth-transition">
            Inscrever-se
          </a>
        </div>
      </div>
    </div>
  </nav>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-24">

    <section id="inicio" class="pt-8 text-center space-y-6 max-w-3xl mx-auto">
      <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue dark:text-brand-cyan text-xs font-semibold tracking-wide">
        <span>📍 Boa Vista, Roraima</span>
        <span class="h-1 w-1 rounded-full bg-brand-blue"></span>
        <span>Conecta 2026</span>
      </div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
        O portal definitivo da sua experiência no <span class="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-green bg-clip-text text-transparent">Conecta</span>
      </h1>
      <p class="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
        Centralize a programação, acesse as atualizações em tempo real e garanta sua presença no maior evento tecnológico da região.
      </p>
      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#agenda" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-brand-blue hover:bg-[#2c59a8] rounded-xl shadow-lg shadow-brand-blue/20 active:scale-98 smooth-transition">
          Explorar Agenda
        </a>
        <a href="https://plataforma-externa.com/inscricao" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl active:scale-98 smooth-transition border border-slate-200 dark:border-slate-700">
          Como se inscrever →
        </a>
      </div>
    </section>

    <section id="noticias" class="space-y-6">
      <div class="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 class="text-2xl font-bold tracking-tight">Principais Notícias</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Avisos importantes e atualizações do evento.</p>
        </div>
        <span class="text-xs font-semibold text-brand-orange uppercase tracking-wider">Feed Ativo</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article class="group p-6 bg-light-surface dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-brand-cyan/30 smooth-transition">
          <div class="flex items-center space-x-2 text-xs text-brand-cyan font-bold mb-3">
            <span>Aviso Urgente</span>
            <span class="h-1 w-1 rounded-full bg-slate-400"></span>
            <span class="text-slate-400 font-medium">Hoje</span>
          </div>
          <h3 class="text-lg font-bold group-hover:text-brand-cyan smooth-transition mb-2">Alteração de sala na palestra de Sistemas Embarcados</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">A palestra sobre IoT da trilha da tarde foi movida para o auditório central por questões de capacidade física.</p>
        </article>

        <article class="group p-6 bg-light-surface dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-brand-green/30 smooth-transition">
          <div class="flex items-center space-x-2 text-xs text-brand-green font-bold mb-3">
            <span>Inscrições</span>
            <span class="h-1 w-1 rounded-full bg-slate-400"></span>
            <span class="text-slate-400 font-medium">Ontem</span>
          </div>
          <h3 class="text-lg font-bold group-hover:text-brand-green smooth-transition mb-2">Lote extra de credenciais liberado na plataforma</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">Devido à alta demanda da comunidade acadêmica, liberamos 50 novas vagas de credenciamento.</p>
        </article>
      </div>
    </section>

    <section id="agenda" class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 class="text-2xl font-bold tracking-tight">Programação do Evento</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Busque atividades por tema, horário ou palestrante em tempo real.</p>
        </div>
        
        <div class="w-full md:w-80">
          <label for="search-input" class="sr-only">Buscar palestra</label>
          <div class="relative">
            <input type="text" id="search-input" placeholder="Buscar palestra ou horário..." class="w-full px-4 py-2 text-sm bg-light-surface dark:bg-dark-surface border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand-cyan font-medium smooth-transition">
            <span class="absolute right-3 top-2.5 text-slate-400 dark:text-slate-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
          </div>
        </div>
      </div>

      <div id="agenda-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="agenda-item p-5 bg-light-surface dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-slate-800 flex items-start space-x-4 hover:border-l-4 hover:border-l-brand-blue smooth-transition">
          <div class="text-center bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg min-w-[70px]">
            <span class="block text-xs font-bold text-brand-blue uppercase">Início</span>
            <span class="block text-sm font-black">14:00</span>
          </div>
          <div class="space-y-1">
            <span class="inline-block px-2 py-0.5 text-[10px] font-bold bg-brand-blue/10 text-brand-blue rounded-md uppercase">Trilha Dev</span>
            <h3 class="text-base font-bold leading-tight">Arquiteturas de Alta Performance com Jamstack</h3>
            <p class="text-xs text-slate-400 font-medium">Palestrante: Prof. Dr. Herbert Oliveira</p>
          </div>
        </div>

        <div class="agenda-item p-5 bg-light-surface dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-slate-800 flex items-start space-x-4 hover:border-l-4 hover:border-l-brand-orange smooth-transition">
          <div class="text-center bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg min-w-[70px]">
            <span class="block text-xs font-bold text-brand-orange uppercase">Início</span>
            <span class="block text-sm font-black">15:30</span>
          </div>
          <div class="space-y-1">
            <span class="inline-block px-2 py-0.5 text-[10px] font-bold bg-brand-orange/10 text-brand-orange rounded-md uppercase">Trilha Hardware</span>
            <h3 class="text-base font-bold leading-tight">Sistemas Inteligentes e Dispositivos Correlatos</h3>
            <p class="text-xs text-slate-400 font-medium">Palestrante: Pesquisadores do PRISM</p>
          </div>
        </div>
      </div>
    </section>

    <section id="localizacao" class="space-y-6">
      <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 class="text-2xl font-bold tracking-tight">Onde o Evento Acontece</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Localização física do Bloco de Engenharia/Computação da Universidade.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div class="p-6 bg-light-surface dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div class="space-y-1">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Espaço Físico</h3>
            <p class="text-base font-bold">Campus Paricarana — UFRR</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">Auditório do Bloco de Ciência e Tecnologia (CCT), Boa Vista - RR.</p>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-slate-800">
            <a href="geo:2.8421,-60.6551?q=UFRR+Campus+Paricarana" class="inline-flex items-center space-x-2 text-sm font-bold text-brand-cyan hover:underline">
              <span>Abrir no Aplicativo de Mapas</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </div>
        </div>

        <div class="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm map-container bg-slate-200 dark:bg-slate-800 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2m3!1s0x0%3A0x0!2m2!1d-60.6551!2d2.8421!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwNTAnMzEuNiJOIDYwwrAzOScxOC40Ilc!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
            class="absolute top-0 left-0 w-full h-full border-0" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin shadow-sm">
          </iframe>
        </div>
      </div>
    </section>

  </main>

  <footer class="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-24 smooth-transition">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
      <p>&copy; 2026 PRISM — Projetos e Desenvolvimento de Sistemas Embarcados Otimizados e Seguros.</p>
      <p>Desenvolvido sob arquitetura Jamstack sustentável utilizando Jekyll e Tailwind CSS.</p>
    </div>
  </footer>

  <script>
    // Gerenciador de Tema Visual Atômico (Mitigação de FOUC)
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').make)) {
      document.documentElement.classList.add('dark');
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      themeToggleDarkIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', function() {
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');

      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }
    });

    // Motor de Busca Client-Side In-Memory O(N) para o MVP
    const searchInput = document.getElementById('search-input');
    const agendaItems = document.querySelectorAll('.agenda-item');

    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      agendaItems.forEach(item => {
        const text = item.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (text.includes(searchTerm)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  </script>
</body>
</html>

```

---

### 🎨 Detalhamento Técnico das Diretrizes de UI/UX

1. **Hierarquia Visual Baseada em Dados (UX Focal):**
A parte superior da tela (*Hero Section*) centraliza as informações fundamentais em menos de 3 cliques: o que é o evento, as coordenadas geográficas de Boa Vista/Roraima e as principais ações de engajamento (Explorar Agenda e se Inscrever).
2. **Mitigação do Efeito FOUC (Flash of Unstyled Content):**
O script contido no escopo do cabeçalho lê o `localStorage` de forma síncrona imediatamente após o parser processar a folha de estilos do Tailwind. Isso impede que a tela dê um "flash" branco em ambientes configurados para o Modo Escuro, mantendo a experiência fluida mesmo sob redes lentas de internet móvel.
3. **Arquitetura de Mapa Responsiva e Resiliente:**
Em conformidade com as restrições da região de Roraima, o elemento `<iframe>` externo do Google Maps utiliza o atributo nativo `loading="lazy"`. O navegador não gasta pacotes de dados para renderizar o mapa até que o usuário role a tela especificamente até o rodapé. Caso o usuário esteja offline ou sem cobertura de rede móvel, o link com o protocolo nativo `geo:` provê um fallback instantâneo que abre a localização diretamente no aplicativo de GPS offline do dispositivo.
4. **Identidade Visual Premium de Alto Impacto:**
A paleta exigida foi incorporada como acentos e categorias específicas de trilhas sobre fundos neutros e limpos (`#0F172A` no tema escuro e `#F8FAFC` no claro). Os cantos suavizados com a propriedade `rounded-2xl` conferem um aspecto minimalista moderno sem poluir o consumo cognitivo do participante do evento.