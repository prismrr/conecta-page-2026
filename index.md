---
title: PRISM Conecta Hub
layout: default
---

<section id="inicio" class="hero wrap">
  <p class="pill">Boa Vista - RR • Conecta 2026</p>
  <h1>O centro oficial de informacoes do evento PRISM Conecta</h1>
  <p class="lead">Consulte noticias, encontre palestras rapidamente e acesse a inscricao oficial em poucos cliques.</p>
  <div class="hero-actions">
    <a href="#agenda" class="btn-primary">Ver agenda</a>
    <a href="https://plataforma-externa.com/inscricao" target="_blank" rel="noopener noreferrer" class="btn-secondary" aria-label="Abrir inscricao oficial em nova aba" data-cta="hero-inscricao">Ir para inscricao</a>
  </div>
</section>

<section id="noticias" class="wrap section">
  <div class="section-head">
    <h2>Noticias</h2>
    <p>Comunicados operacionais e atualizacoes do evento.</p>
  </div>
  <div class="grid news-grid">
    {% assign ordered_news = site.news | sort: 'date' | reverse %}
    {% for item in ordered_news limit: 8 %}
      <article class="card news-card">
        <p class="meta">{{ item.date | date: "%d/%m/%Y" }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.excerpt | strip_html | truncate: 140 }}</p>
      </article>
    {% endfor %}
  </div>
</section>

<section id="agenda" class="wrap section">
  <div class="section-head section-row">
    <div>
      <h2>Agenda</h2>
      <p>Busca textual por horario, trilha, palestrante ou tema.</p>
    </div>
    <label class="search-wrap" for="agenda-search">
      <span class="visually-hidden">Buscar na agenda</span>
      <input id="agenda-search" type="text" placeholder="Buscar na agenda..." autocomplete="off">
    </label>
  </div>

  <p id="agenda-status" class="status" aria-live="polite">Carregando agenda...</p>
  <div id="agenda-list" class="grid agenda-grid">
    {% assign sessions = site.agenda | sort: 'startTime' %}
    {% for s in sessions %}
      <article class="card agenda-item" data-search="{{ s.title }} {{ s.speaker }} {{ s.track }} {{ s.startTime }} {{ s.room }}">
        <p class="meta">{{ s.startTime }} - {{ s.endTime }} • {{ s.track }}</p>
        <h3>{{ s.title }}</h3>
        <p>{{ s.speaker }} • {{ s.room }}</p>
      </article>
    {% endfor %}
  </div>
</section>

<section id="localizacao" class="wrap section">
  <div class="section-head">
    <h2>Localizacao</h2>
    <p>Campus Paricarana - UFRR, Auditorio do Bloco CCT, Boa Vista - RR.</p>
  </div>
  <div class="location-grid">
    <article class="card location-card">
      <p class="location-title">Ponto oficial do evento</p>
      <p>Endereco: Campus Paricarana, Bloco de Ciencia e Tecnologia (CCT), Boa Vista - RR.</p>
      <p>Referencia: acesso principal pela Avenida Capitao Ene Garcez.</p>
      <div class="link-stack">
        <a href="geo:2.8421,-60.6551?q=UFRR+Campus+Paricarana" class="location-link" aria-label="Abrir localizacao no aplicativo de mapas do dispositivo" data-cta="localizacao-geo">Abrir no app de mapas</a>
        <a href="https://maps.google.com/?q=2.8421,-60.6551" target="_blank" rel="noopener noreferrer" class="location-link secondary" aria-label="Abrir localizacao no Google Maps em nova aba" data-cta="localizacao-webmap">Abrir no navegador</a>
      </div>
    </article>

    <article class="card location-card">
      <p class="location-title">Plano de contingencia de acesso</p>
      <ul class="location-checklist">
        <li>Salve o endereco antes de sair de casa caso a internet fique instavel.</li>
        <li>Use o link geo como primeira opcao em dispositivos moveis.</li>
        <li>Se o mapa nao abrir, apresente o endereco completo na portaria da UFRR.</li>
      </ul>
    </article>
  </div>
</section>

<section id="inscricao" class="wrap section">
  <div class="section-head">
    <h2>Inscricao</h2>
    <p>Fluxo declarativo: sem cadastro local, sem sessao e com redirecionamento direto para a plataforma oficial.</p>
  </div>
  <article class="card signup-card">
    <p class="location-title">Garanta sua vaga no PRISM Conecta 2026</p>
    <p>O processo de inscricao ocorre em plataforma externa homologada pela organizacao do evento.</p>
    <div class="hero-actions">
      <a href="https://plataforma-externa.com/inscricao" target="_blank" rel="noopener noreferrer" class="btn-primary" aria-label="Abrir inscricao oficial em nova aba" data-cta="secao-inscricao-principal">Abrir inscricao oficial</a>
      <a href="https://plataforma-externa.com/inscricao" target="_blank" rel="noopener noreferrer" class="btn-secondary" aria-label="Abrir link direto de contingencia para inscricao" data-cta="secao-inscricao-contingencia">Usar link direto de contingencia</a>
    </div>
    <p class="microcopy">Caso o botao principal nao funcione na sua rede, use o link direto de contingencia acima.</p>
  </article>
</section>
