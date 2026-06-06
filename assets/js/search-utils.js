(function (global) {
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

  function filterSessions(sessions, query) {
    const term = normalize(query);
    if (!term) return sessions;

    return sessions.filter((s) =>
      normalize(`${s.title} ${s.speaker} ${s.track} ${s.startTime} ${s.room}`).includes(term)
    );
  }

  const api = {
    normalize,
    escapeHtml,
    isValidSession,
    filterSessions,
  };

  global.SearchUtils = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
