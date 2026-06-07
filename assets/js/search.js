(function () {
  const input = document.getElementById("agenda-search");
  const status = document.getElementById("agenda-status");
  const list = document.getElementById("agenda-list");
  const utils = window.SearchUtils;
  let isFallbackMode = false;

  if (!input || !status || !list || !utils) {
    return;
  }

  function applyDomFilter(query) {
    const term = utils.normalize(query);
    const cards = Array.from(list.querySelectorAll(".agenda-item"));
    let visible = 0;

    cards.forEach((card) => {
      const text = utils.normalize(card.getAttribute("data-search") || card.textContent);
      const show = text.includes(term);
      card.style.display = show ? "block" : "none";
      if (show) visible += 1;
    });

    if (isFallbackMode) {
      status.classList.add("status-warning");
      status.textContent = term
        ? `Agenda em modo fallback local. ${visible} resultado(s) encontrado(s).`
        : `Agenda em modo fallback local. Mostrando ${visible} sessao(oes).`;
    } else {
      status.classList.remove("status-warning");
      status.textContent = term
        ? `${visible} resultado(s) encontrado(s).`
        : `Mostrando ${visible} sessao(oes).`;
    }

    if (term && visible === 0) {
      status.textContent = isFallbackMode
        ? "Agenda em modo fallback local. Nenhuma sessao encontrada para este termo."
        : "Nenhuma sessao encontrada para este termo.";
    }

    window.Monitoring?.send("agenda_search", {
      mode: isFallbackMode ? "fallback" : "primary",
      queryLength: term.length,
      results: visible,
    });
  }

  function renderSessions(sessions, query) {
    const term = utils.normalize(query);
    const filtered = utils.sortSessions(utils.filterSessions(sessions, term));

    list.innerHTML = filtered
      .map(
        (s) => `
        <article class="card agenda-item" data-search="${utils.escapeHtml(s.title)} ${utils.escapeHtml(s.speaker)} ${utils.escapeHtml(s.track)} ${utils.escapeHtml(s.date)} ${utils.escapeHtml(s.startTime)} ${utils.escapeHtml(s.room)}">
          <p class="meta">${utils.escapeHtml(s.date)} • ${utils.escapeHtml(s.startTime)} - ${utils.escapeHtml(s.endTime)} • ${utils.escapeHtml(s.track)}</p>
          <h3>${utils.escapeHtml(s.title)}</h3>
          <p>${utils.escapeHtml(s.speaker)} • ${utils.escapeHtml(s.room)}</p>
        </article>
      `
      )
      .join("");

    status.classList.remove("status-warning");
    status.textContent = term
      ? `${filtered.length} resultado(s) encontrado(s).`
      : `Mostrando ${filtered.length} sessao(oes).`;

    if (term && filtered.length === 0) {
      status.textContent = "Nenhuma sessao encontrada para este termo.";
    }

    window.Monitoring?.send("agenda_search", {
      mode: "primary",
      queryLength: term.length,
      results: filtered.length,
    });
  }

  fetch("/assets/data/agenda.json", { headers: { Accept: "application/json" } })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Falha ao carregar agenda");
      }
      return res.json();
    })
    .then((sessions) => {
      if (!Array.isArray(sessions)) {
        throw new Error("Dataset de agenda invalido");
      }

      const validSessions = utils.sortSessions(sessions.filter(utils.isValidSession));
      if (validSessions.length === 0) {
        throw new Error("Dataset de agenda sem sessoes validas");
      }

      window.Monitoring?.send("agenda_loaded", {
        source: "dataset",
        sessions: validSessions.length,
      });

      renderSessions(validSessions, "");
      input.addEventListener("input", (event) => {
        renderSessions(validSessions, event.target.value);
      });
    })
    .catch((error) => {
      isFallbackMode = true;
      status.classList.add("status-warning");
      status.textContent = "Agenda em modo fallback local. Busca aplicada sobre a listagem inicial.";
      window.Monitoring?.send("agenda_fallback", {
        reason: String(error?.message || "unknown"),
      });
      applyDomFilter("");
      input.addEventListener("input", (event) => {
        applyDomFilter(event.target.value);
      });
    });
})();
