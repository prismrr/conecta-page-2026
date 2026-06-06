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

    status.textContent = term
      ? `${visible} resultado(s) encontrado(s).`
      : `Mostrando ${visible} sessao(oes).`;
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
        <article class="card agenda-item" data-search="${s.title} ${s.speaker} ${s.track} ${s.start_time} ${s.room}">
          <p class="meta">${s.start_time} - ${s.end_time} • ${s.track}</p>
          <h3>${s.title}</h3>
          <p>${s.speaker} • ${s.room}</p>
        </article>
      `
      )
      .join("");

    status.textContent = term
      ? `${filtered.length} resultado(s) encontrado(s).`
      : `Mostrando ${filtered.length} sessao(oes).`;
  }

  fetch("/assets/data/agenda.json", { headers: { Accept: "application/json" } })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Falha ao carregar agenda");
      }
      return res.json();
    })
    .then((sessions) => {
      renderSessions(sessions, "");
      input.addEventListener("input", (event) => {
        renderSessions(sessions, event.target.value);
      });
    })
    .catch(() => {
      status.textContent = "Agenda em modo fallback local.";
      applyDomFilter("");
      input.addEventListener("input", (event) => {
        applyDomFilter(event.target.value);
      });
    });
})();
