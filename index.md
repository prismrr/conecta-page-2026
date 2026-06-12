---
title: PRISM Conecta Hub
layout: default
---

<section id="inicio" class="hero wrap">
  <p class="pill">Boa Vista - RR • Conecta 2026</p>
  <div class="prism-conecta-hero">
    <h1 class="main-title">O centro de informações do evento PRISM Conecta</h1>
    <img class="logo-image" src="assets/img/logo2-v2.svg" alt="Logotipo do PRISM Conecta">
  </div>

  <div class="grid news-grid">
    <article class="card location-card">  
        <p>Uma jornada de três meses de puro aprendizado e inovação. Promovido pelo <a class="location-title" href="https://prismrr.github.io/">grupo de pesquisa PRISM-RR</a>, o evento oferece um ciclo completo de palestras, minicursos e atividades práticas (hands-on). Mergulhe fundo nas áreas que estão moldando o futuro da tecnologia:</p>
        <ul>
            <li>Sistemas Embarcados Inteligentes</li>
            <li>Sistemas Ciber-Físicos</li>
            <li>Verificação e Testes Automatizados</li>
            <li>Sistemas de Decisão em Engenharia Aplicada</li>
        </ul>

    </article>
  </div>
  
  <p class="lead">Consulte notícias, encontre palestras rapidamente e acesse a inscrição oficial em poucos cliques.</p>
  <div class="hero-actions">
    <a href="#agenda" class="btn-primary">Ver agenda</a>
    <a href="https://plataforma-externa.com/inscricao" target="_blank" rel="noopener noreferrer" class="btn-secondary" aria-label="Abrir inscricao oficial em nova aba" data-cta="hero-inscricao">Ir para inscrição</a>
  </div>
</section>

<section id="noticias" class="wrap section">
  <div class="section-head">
    <h2>Notícias</h2>
    <p>Comunicados operacionais e atualizações do evento.</p>
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
      <p>Busca textual por horário, trilha, palestrante ou tema.</p>      
    </div>
    <label class="search-wrap" for="agenda-search">
      <span class="visually-hidden">Buscar na agenda</span>
      <input id="agenda-search" type="text" placeholder="Buscar na agenda..." autocomplete="off">
    </label>
  </div>

  <p class="status status-warning">Mantenha-se atualizado: nossa agenda é dinâmica.</p>
  <p id="agenda-status" class="status" aria-live="polite">Carregando agenda...</p>
  <div id="agenda-list" class="grid agenda-grid">
    {% assign sessions = site.agenda | sort: 'startTime' | sort: 'date' %}
    {% for s in sessions %}
      <article class="card agenda-item" data-search="{{ s.title }} {{ s.speaker }} {{ s.track }} {{ s.date }} {{ s.startTime }} {{ s.room }}">
        <p class="agenda-date">Data: {{ s.date | date: "%d/%m/%Y" }}</p>
        <p class="meta">{{ s.startTime }} - {{ s.endTime }} • {{ s.track }}</p>
        <h3>{{ s.title }}</h3>
        <p>{{ s.speaker }} • {{ s.room }}</p>
      </article>
    {% endfor %}
  </div>
</section>

<section id="localizacao" class="wrap section">
  <div class="section-head">
    <h2>Localização</h2>
    <p>Campus Paricarana - UFRR, Laboratório Maloca das iCoisas, Boa Vista - RR.</p>
  </div>
  <div class="location-grid">
    <article class="card location-card">
      <p class="location-title">Ponto ofícial do evento</p>
      <p>Campus Paricarana, Centro de Inovação e Tecnologia. Endereço: Av. Cap. Ene Garcês, 2413 - Aeroporto, Boa Vista - RR.</p>
      <p>Referência: acesso pela Avenida Capitão Ene Garcez.</p>
      <div class="link-stack">
        <a href="geo:2.8366877066335463, -60.69144884937666?q=UFRR CIT" class="location-link" aria-label="Abrir localizacao no aplicativo de mapas do dispositivo" data-cta="localizacao-geo">Abrir no app de mapas</a>
        <a href="https://maps.google.com/?q=2.8366877066335463, -60.69144884937666" target="_blank" rel="noopener noreferrer" class="location-link secondary" aria-label="Abrir localizacao no Google Maps em nova aba" data-cta="localizacao-webmap">Abrir no navegador</a>
      </div>
      
    </article>

    <article class="card location-card">
      <p class="location-title">Plano de contingência de acesso</p>
      <ul class="location-checklist">
        <li>Salve o endereço antes de sair de casa caso a internet fique instavel.</li>
        <li>Use o link geo como primeira opção em dispositivos móveis.</li>
        <li>Se o mapa não abrir, apresente o endereço completo na portaria da UFRR.</li>
      </ul>
    </article>
  </div>

  <article class="card location-map-card" data-cta="localizacao-mapa-cit">
    <p class="location-title">Mapa do CIT - Centro de Inovação e Tecnologia</p>
    <p>Av. Nova Iorque, 48-188 - Aeroporto, Boa Vista - RR, 69310-010.</p>
    <div id="map-placeholder-parent" class="location-map-frame-wrap">
      <div class="map-placeholder-pending">
        <p>Ative as funcionalidades de localização no banner de privacidade para ver o mapa interativo.</p>
      </div>
    </div>
    <p class="microcopy">Se o mapa embutido nao carregar, use os links abaixo.</p>
    <div class="link-stack">
      <a href="geo:0,0?q=Av.+Nova+Iorque,+48-188+-+Aeroporto,+Boa+Vista+-+RR,+69310-010" class="location-link" aria-label="Abrir localizacao do CIT no aplicativo de mapas do dispositivo" data-cta="localizacao-geo-mapa">Abrir no app de mapas</a>
      <a href="https://maps.google.com/?q=Av.+Nova+Iorque,+48-188+-+Aeroporto,+Boa+Vista+-+RR,+69310-010" target="_blank" rel="noopener noreferrer" class="location-link secondary" aria-label="Abrir localizacao do CIT no Google Maps em nova aba" data-cta="localizacao-webmap-mapa">Abrir no navegador</a>
    </div>
  </article>
</section>

<section id="inscricao" class="wrap section">
  <div class="section-head">
    <h2>Inscrição</h2>
    <br>
  </div>
  <article class="card signup-card">
    <p class="location-title">Garanta sua vaga no PRISM Conecta 2026</p>
    <p>O processo de inscrição ocorre em plataforma externa homologada pela organização do evento.</p>
    <div class="hero-actions">
      <a href="https://plataforma-externa.com/inscricao" target="_blank" rel="noopener noreferrer" class="btn-primary" aria-label="Abrir inscricao oficial em nova aba" data-cta="secao-inscricao-principal">Abrir inscrição ofícial</a>
      <!-- <a href="https://plataforma-externa.com/inscricao" target="_blank" rel="noopener noreferrer" class="btn-secondary" aria-label="Abrir link direto de contingencia para inscricao" data-cta="secao-inscricao-contingencia">Usar link direto de contingencia</a> -->
    </div>
    <!-- <p class="microcopy">Caso o botao principal nao funcione na sua rede, use o link direto de contingencia acima.</p> -->
  </article>
</section>
