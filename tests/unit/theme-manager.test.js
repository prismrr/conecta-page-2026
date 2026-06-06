const {
  getInitialTheme,
  applyTheme,
  initTheme,
  bindThemeToggle,
  STORAGE_KEY,
} = require("../../assets/js/theme-manager.js");

describe("theme manager", () => {
  it("resolve tema inicial com preferencia salva", () => {
    expect(getInitialTheme("light", true)).toBe("light");
    expect(getInitialTheme("dark", false)).toBe("dark");
    expect(getInitialTheme(null, true)).toBe("dark");
  });

  it("aplica tema no elemento raiz", () => {
    const root = { setAttribute: vi.fn() };
    const doc = { documentElement: root };
    applyTheme("light", doc);
    expect(root.setAttribute).toHaveBeenCalledWith("data-theme", "light");
  });

  it("inicializa tema e faz toggle", () => {
    let saved = null;
    const storage = {
      getItem: vi.fn(() => null),
      setItem: vi.fn((k, v) => {
        if (k === STORAGE_KEY) saved = v;
      }),
    };

    const root = {
      attr: "dark",
      setAttribute: vi.fn((_, v) => {
        root.attr = v;
      }),
      getAttribute: vi.fn(() => root.attr),
    };
    const doc = { documentElement: root };

    initTheme({
      document: doc,
      storage,
      matchMedia: () => ({ matches: true }),
    });

    const listeners = {};
    const button = {
      addEventListener: vi.fn((event, cb) => {
        listeners[event] = cb;
      }),
    };

    bindThemeToggle(button, { document: doc, storage });
    listeners.click();

    expect(saved).toBe("light");
  });
});
