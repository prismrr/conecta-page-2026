(function (global) {
  const STORAGE_KEY = "color-theme";

  function getInitialTheme(storageValue, prefersDark) {
    if (storageValue === "dark" || storageValue === "light") {
      return storageValue;
    }
    return "dark";
  }

  function applyTheme(theme, doc) {
    const root = (doc || global.document).documentElement;
    root.setAttribute("data-theme", theme);
  }

  function initTheme(options) {
    const doc = options?.document || global.document;
    const storage = options?.storage || global.localStorage;
    const media = options?.matchMedia || global.matchMedia;

    if (!doc || !storage || !media) {
      return { theme: "dark" };
    }

    const saved = storage.getItem(STORAGE_KEY);
    const prefersDark = !!media("(prefers-color-scheme: dark)").matches;
    const theme = getInitialTheme(saved, prefersDark);
    applyTheme(theme, doc);

    return { theme };
  }

  function bindThemeToggle(button, options) {
    const doc = options?.document || global.document;
    const storage = options?.storage || global.localStorage;

    if (!button || !doc || !storage) return;

    button.addEventListener("click", () => {
      const current = doc.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next, doc);
      storage.setItem(STORAGE_KEY, next);
    });
  }

  function bootTheme() {
    const result = initTheme();
    const toggle = global.document?.getElementById("theme-toggle");
    bindThemeToggle(toggle);
    return result;
  }

  if (global.document) {
    global.addEventListener("DOMContentLoaded", () => {
      bootTheme();
    });
  }

  const api = {
    STORAGE_KEY,
    getInitialTheme,
    applyTheme,
    initTheme,
    bindThemeToggle,
    bootTheme,
  };

  global.ThemeManager = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
