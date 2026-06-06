(function () {
  const input = document.getElementById("agenda-search");
  const status = document.getElementById("agenda-status");
  const list = document.getElementById("agenda-list");

  if (!input || !status || !list) {
    return;
  }

  function normalize(text) {
    return (text || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function escapeHtml(text) {
    return (text || "")
      .toString()
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function isValidSession(session) {
    const required = ["id", "title", "speaker", "track", "startTime", "endTime", "room"];
    return required.every((field) => typeof session[field] === "string" && session[field].trim().length > 0);
  }

  function applyDomFilter(query) {
    const term = normalize(query);
    const cards = Array.from(list.querySelectorAll(".agenda-item"));
    let visible = 0;

    cards.forEach((card) => {
      const text = normalize(card.getAttribute("data-search") || card.textContent);
      const show = text.includes(term);
      card.style.display = show ? "block" : "none";
      if (show) visible += 1;
    });

    status.classList.remove("status-warning");
    status.textContent = term
      ? `${visible} resultado(s) encontrado(s).`
      : `Mostrando ${visible} sessao(oes).`;

    if (term && visible === 0) {
      status.textContent = "Nenhuma sessao encontrada para este termo.";
    }
  }

  function renderSessions(sessions, query) {
    const term = normalize(query);
    const filtered = term
      ? sessions.filter((s) =>
          normalize(`${s.title} ${s.speaker} ${s.track} ${s.start_time} ${s.room}`).includes(term)
        )
      : sessions;

    list.innerHTML = filtered
      .map(
        (s) => `
        <article class="card agenda-item" data-search="${escapeHtml(s.title)} ${escapeHtml(s.speaker)} ${escapeHtml(s.track)} ${escapeHtml(s.startTime)} ${escapeHtml(s.room)}">
          <p class="meta">${escapeHtml(s.startTime)} - ${escapeHtml(s.endTime)} • ${escapeHtml(s.track)}</p>
          <h3>${escapeHtml(s.title)}</h3>
          <p>${escapeHtml(s.speaker)} • ${escapeHtml(s.room)}</p>
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

      const validSessions = sessions.filter(isValidSession);
      if (validSessions.length === 0) {
        throw new Error("Dataset de agenda sem sessoes validas");
      }

      renderSessions(validSessions, "");
      input.addEventListener("input", (event) => {
        renderSessions(validSessions, event.target.value);
      });
    })
    .catch(() => {
      status.classList.add("status-warning");
      status.textContent = "Agenda em modo fallback local. Busca aplicada sobre a listagem inicial.";
      applyDomFilter("");
      input.addEventListener("input", (event) => {
        applyDomFilter(event.target.value);
      });
    });
})();
