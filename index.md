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
    <a href="https://plataforma-externa.com/inscricao" target="_blank" rel="noopener noreferrer" class="btn-secondary">Ir para inscricao</a>
  </div>
</section>

<section id="noticias" class="wrap section">
  <div class="section-head">
    <h2>Noticias</h2>
    <p>Comunicados operacionais e atualizacoes do evento.</p>
  </div>
  <div class="grid news-grid">
    {% assign ordered_news = site.news | sort: 'date' | reverse %}
    {% for item in ordered_news limit: 6 %}
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
    {% assign sessions = site.agenda | sort: 'start_time' %}
    {% for s in sessions %}
      <article class="card agenda-item" data-search="{{ s.title }} {{ s.speaker }} {{ s.track }} {{ s.start_time }} {{ s.room }}">
        <p class="meta">{{ s.start_time }} - {{ s.end_time }} • {{ s.track }}</p>
        <h3>{{ s.title }}</h3>
        <p>{{ s.speaker }} • {{ s.room }}</p>
      </article>
    {% endfor %}
  </div>
</section>

<section id="localizacao" class="wrap section">
  <div class="section-head">
    <h2>Localizacao</h2>
    <p>Campus Paricarana - UFRR, Auditório do Bloco CCT, Boa Vista - RR.</p>
  </div>
  <article class="card location-card">
    <p>Endereco: Campus Paricarana, Bloco de Ciencia e Tecnologia (CCT), Boa Vista - RR.</p>
    <a href="geo:2.8421,-60.6551?q=UFRR+Campus+Paricarana" class="location-link">Abrir no app de mapas</a>
  </article>
</section>
