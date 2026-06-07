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
    const required = ["id", "title", "speaker", "track", "date", "startTime", "endTime", "room"];
    const hasAllFields = required.every(
      (field) => typeof session[field] === "string" && session[field].trim().length > 0
    );
    if (!hasAllFields) return false;

    return /^([0-2]\d|3[01])\/(0\d|1[0-2])\/\d{4}$/.test(session.date);
  }

  function filterSessions(sessions, query) {
    const term = normalize(query);
    if (!term) return sessions;

    return sessions.filter((s) =>
      normalize(`${s.title} ${s.speaker} ${s.track} ${s.date} ${s.startTime} ${s.room}`).includes(term)
    );
  }

  function parseDateTimeBr(dateBr, time) {
    const [day, month, year] = String(dateBr || "").split("/");
    if (!day || !month || !year) return Number.POSITIVE_INFINITY;

    const [hours = "00", minutes = "00"] = String(time || "").split(":");
    return Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), 0, 0);
  }

  function sortSessions(sessions) {
    return [...sessions].sort((a, b) => parseDateTimeBr(a.date, a.startTime) - parseDateTimeBr(b.date, b.startTime));
  }

  const api = {
    normalize,
    escapeHtml,
    isValidSession,
    filterSessions,
    sortSessions,
  };

  global.SearchUtils = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
