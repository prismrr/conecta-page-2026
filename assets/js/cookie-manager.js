document.addEventListener('DOMContentLoaded', () => {
const STORAGE_KEY = 'user_privacy_consent';
const banner = document.getElementById('cookie-consent-banner');
const toggleBtn = document.getElementById('privacy-toggle-btn');
// --- 1. Inicialização do Estado ---
let consentState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { analytics: true, functional: true };
// Aplica o estado ao UI no carregamento
document.querySelectorAll('.option-label input[type="checkbox"]').forEach(checkbox => {
const service = checkbox.dataset.service;
checkbox.checked = consentState[service] === true;
});
// Inicializa a UI: Mostra o banner se não houver consentimento salvo
if (!localStorage.getItem(STORAGE_KEY)) {
banner.style.display = 'block';
}
// --- 2. Funções de Controle de Consentimento ---
/**
* Atualiza o estado interno e dispara os scripts de terceiros de acordo com as escolhas.
* @param {boolean} acceptAnalytics 
* @param {boolean} acceptFunctional 
*/
const setConsent = (acceptAnalytics, acceptFunctional) => {
consentState = { analytics: acceptAnalytics, functional: acceptFunctional };
localStorage.setItem(STORAGE_KEY, JSON.stringify(consentState));
// 1. Esconder o banner após a decisão
banner.style.display = 'none';
// 2. Atualizar o estado dos scripts de terceiros
updateGTagConsent(acceptAnalytics);
renderGoogleMaps(acceptFunctional);
};
// --- 3. Integração com Google Analytics 4 (Consent Mode v2) ---
const updateGTagConsent = (isAnalyticsGranted) => {
if (typeof gtag === 'function') {
// Configura o Consent Mode v2
gtag('consent', 'update', {
'analytics_storage': isAnalyticsGranted ? 'granted' : 'denied',
'ad_storage': isAnalyticsGranted ? 'granted' : 'denied'
});
console.log(`[Privacy] GA4 Consent updated: analytics_storage=${isAnalyticsGranted ? 'granted' : 'denied'}`);
}
};
// --- 4. Renderização Condicional do Google Maps ---
const renderGoogleMaps = (isFunctionalGranted) => {
const mapContainer = document.getElementById('map-placeholder-parent');
if (!mapContainer) return;
if (isFunctionalGranted) {
// Ação: Injetar o script/iframe real do Google Maps aqui.
console.log("[Privacy] Rendering Google Maps component.");
// Exemplo: Aqui deve ser executada a lógica de inicialização da API do Maps
mapContainer.innerHTML = '<div id="google-map-widget">/* Conteúdo do Mapa Injetado Aqui */</div>';
} else {
// Ação: Exibir Placeholder de Privacidade
console.log("[Privacy] Map service blocked by user consent.");
mapContainer.innerHTML = `
<div class="map-placeholder-blocked">
<p>📍 A localização no mapa foi desativada por motivos de privacidade. Você pode visualizar o endereço principal no texto abaixo.</p>
<p>Para ativar, por favor, conceda o consentimento funcional no banner de cookies.</p>
</div>
`;
}
};
// --- 5. Event Listeners (Handlers) ---
// Evento de Aceitar Tudo
document.getElementById('accept-all-btn')?.addEventListener('click', () => {
setConsent(true, true);
});
// Evento de Rejeitar Selecionados (Bloqueia tudo que estiver desmarcado)
document.getElementById('reject-all-btn')?.addEventListener('click', () => {
const analyticsChecked = document.getElementById('analytics-consent').checked;
const functionalChecked = document.getElementById('functional-consent').checked;
setConsent(analyticsChecked, functionalChecked);
});
// Listener Genérico para mudanças de checkbox (para garantir persistência ao mudar uma opção)
document.querySelectorAll('.option-label input[type="checkbox"]').forEach(checkbox => {
checkbox.addEventListener('change', () => {
const analyticsChecked = document.getElementById('analytics-consent').checked;
const functionalChecked = document.getElementById('functional-consent').checked;
// Avisar o usuário que precisa confirmar após mudar um checkbox, ou reprocessar
// Para simplificar o exemplo, vamos forçar um "re-submit" na mudança de qualquer checkbox
if (window.confirm("Mudou uma opção. Clique em 'Aceitar Tudo' ou 'Rejeitar Selecionados' para aplicar.")) {
setConsent(analyticsChecked, functionalChecked);
}
});
});
// Toggle Flutuante (Para reabrir o banner de gerenciamento)
toggleBtn?.addEventListener('click', () => {
if (banner.style.display === 'none') {
banner.style.display = 'block';
// Foca no banner e remove o foco do botão flutuante
document.getElementById('consent-title').focus(); 
}
});
});