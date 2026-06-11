document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'user_privacy_consent';
  const overlay = document.getElementById('privacy-modal-overlay');
  const toggleBtn = document.getElementById('privacy-toggle-btn');

  // --- 1. Inicialização do Estado ---
  let consentState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { analytics: false, functional: false };

  const showModal = () => {
    overlay.removeAttribute('hidden');
    document.getElementById('consent-title').focus();
  };

  const hideModal = () => {
    overlay.setAttribute('hidden', '');
    toggleBtn.focus();
  };

  // Aplica o estado salvo aos checkboxes
  document.querySelectorAll('.privacy-option-label input[type="checkbox"]').forEach(checkbox => {
    const service = checkbox.dataset.service;
    checkbox.checked = consentState[service] === true;
  });

  // Abre o modal automaticamente na primeira visita
  if (!localStorage.getItem(STORAGE_KEY)) {
    showModal();
  }

  // --- 2. Funções de Controle de Consentimento ---
  const setConsent = (acceptAnalytics, acceptFunctional) => {
    consentState = { analytics: acceptAnalytics, functional: acceptFunctional };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consentState));
    hideModal();
    updateGTagConsent(acceptAnalytics);
    renderGoogleMaps(acceptFunctional);
  };

  // --- 3. Integração com Google Analytics 4 (Consent Mode v2) ---
  const updateGTagConsent = (isAnalyticsGranted) => {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': isAnalyticsGranted ? 'granted' : 'denied',
        'ad_storage': isAnalyticsGranted ? 'granted' : 'denied'
      });
    }
  };

  // --- 4. Renderização Condicional do Google Maps ---
  const renderGoogleMaps = (isFunctionalGranted) => {
    const mapContainer = document.getElementById('map-placeholder-parent');
    if (!mapContainer) return;
    if (isFunctionalGranted) {
      mapContainer.innerHTML = '<iframe class="location-map-frame" title="Mapa do CIT - Centro de Inovação e Tecnologia" aria-label="Mapa interativo do CIT em Boa Vista" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Av.+Nova+Iorque,+48-188+-+Aeroporto,+Boa+Vista+-+RR,+69310-010&output=embed" allowfullscreen></iframe>';
    } else {
      mapContainer.innerHTML = '<div class="map-placeholder-blocked"><p>A localização no mapa foi desativada por motivos de privacidade.</p><p>Para ativar, conceda o consentimento funcional pelo botão de privacidade.</p></div>';
    }
  };

  // --- 5. Event Listeners ---
  document.getElementById('accept-all-btn')?.addEventListener('click', () => {
    setConsent(true, true);
  });

  document.getElementById('reject-all-btn')?.addEventListener('click', () => {
    const analyticsChecked = document.getElementById('analytics-consent').checked;
    const functionalChecked = document.getElementById('functional-consent').checked;
    setConsent(analyticsChecked, functionalChecked);
  });

  toggleBtn?.addEventListener('click', () => {
    // Sincroniza checkboxes com o estado atual antes de abrir
    document.getElementById('analytics-consent').checked = consentState.analytics === true;
    document.getElementById('functional-consent').checked = consentState.functional === true;
    showModal();
  });

  // Fecha com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hasAttribute('hidden')) {
      // Só fecha via Escape se o usuário já tiver feito uma escolha prévia
      if (localStorage.getItem(STORAGE_KEY)) {
        hideModal();
      }
    }
  });

  // Aplica serviços de terceiros para usuários com consentimento já salvo
  if (localStorage.getItem(STORAGE_KEY)) {
    updateGTagConsent(consentState.analytics);
    renderGoogleMaps(consentState.functional);
  }
});
