(function (global) {
  const endpoint = "/telemetry";
  let gaInitialized = false;

  function now() {
    try {
      return Date.now();
    } catch {
      return 0;
    }
  }

  function payload(event, data) {
    return {
      event,
      data,
      page: global.location?.pathname || "/",
      ts: now(),
      ua: global.navigator?.userAgent || "unknown",
    };
  }

  function getGaMeasurementId() {
    const content = global.document
      ?.querySelector("meta[name='ga4-measurement-id']")
      ?.getAttribute("content");
    return (content || "").trim();
  }

  function ensureGaInitialized() {
    if (gaInitialized) return true;

    const measurementId = getGaMeasurementId();
    if (!measurementId) return false;

    global.dataLayer = global.dataLayer || [];

    if (typeof global.gtag !== "function") {
      global.gtag = function gtag() {
        global.dataLayer.push(arguments);
      };
    }

    global.gtag("js", new Date());
    global.gtag("config", measurementId, {
      send_page_view: true,
      anonymize_ip: true,
    });

    gaInitialized = true;
    return true;
  }

  function sanitizeEventParams(data, telemetryPayload) {
    const safe = {
      page_path: telemetryPayload.page,
      user_agent: telemetryPayload.ua,
    };

    const source = data && typeof data === "object" ? data : {};
    for (const [key, value] of Object.entries(source)) {
      if (value == null) continue;
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        safe[key] = value;
      } else {
        safe[key] = JSON.stringify(value);
      }
    }

    return safe;
  }

  function sendToGa(event, data, telemetryPayload) {
    if (!ensureGaInitialized()) return;
    if (typeof global.gtag !== "function") return;

    try {
      global.gtag("event", event, sanitizeEventParams(data, telemetryPayload));
    } catch {
      // GA4 should never break UX flow.
    }
  }

  function sendToLocal(body) {
    try {
      if (global.navigator?.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        global.navigator.sendBeacon(endpoint, blob);
        return;
      }
    } catch {
      // Fallback to fetch below.
    }

    if (global.fetch) {
      global.fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        // Telemetry should never break UX flow.
      });
    }
  }

  function send(event, data) {
    const telemetryPayload = payload(event, data);
    const body = JSON.stringify(telemetryPayload);

    sendToGa(event, data, telemetryPayload);
    sendToLocal(body);
  }

  function setupErrorMonitoring() {
    global.addEventListener("error", (event) => {
      send("js_error", {
        message: event.message || "unknown",
        source: event.filename || "inline",
        line: event.lineno || 0,
        column: event.colno || 0,
      });
    });

    global.addEventListener("unhandledrejection", (event) => {
      send("promise_rejection", {
        reason: String(event.reason || "unknown"),
      });
    });
  }

  function setupVitalsMonitoring() {
    if (!global.PerformanceObserver) return;

    try {
      const perf = global.performance;
      const navEntry = perf.getEntriesByType("navigation")[0];
      if (navEntry) {
        send("nav_timing", {
          ttfb: Math.round(navEntry.responseStart),
          domContentLoaded: Math.round(navEntry.domContentLoadedEventEnd),
        });
      }
    } catch {
      // ignore
    }

    try {
      const lcpObserver = new global.PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          send("web_vitals", { metric: "LCP", value: Math.round(last.startTime) });
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // ignore
    }

    try {
      let clsValue = 0;
      const clsObserver = new global.PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) clsValue += entry.value;
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });

      global.addEventListener("visibilitychange", () => {
        if (global.document.visibilityState === "hidden") {
          send("web_vitals", { metric: "CLS", value: Number(clsValue.toFixed(4)) });
        }
      });
    } catch {
      // ignore
    }

    try {
      const fcpObserver = new global.PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            send("web_vitals", { metric: "FCP", value: Math.round(entry.startTime) });
          }
        }
      });
      fcpObserver.observe({ type: "paint", buffered: true });
    } catch {
      // ignore
    }
  }

  function setupBasicAvailabilityPing() {
    send("app_boot", { status: "ok" });
  }

  function init() {
    ensureGaInitialized();
    setupBasicAvailabilityPing();
    setupErrorMonitoring();
    setupVitalsMonitoring();
  }

  const api = {
    send,
    init,
  };

  global.Monitoring = api;

  if (global.document) {
    global.addEventListener("DOMContentLoaded", () => {
      init();
    });
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
