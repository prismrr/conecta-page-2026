Como Engenheiro de Software Principal e Especialista em Jamstack, Segurança da Informação e Privacidade, elaborei o documento de especificação técnica completo, focando na implementação do *Privacy by Design* para o contexto estático de Jekyll, cumprindo com os requisitos da LGPD.

Abaixo está a resposta estruturada em quatro partes: Matriz de Requisitos, Código de Implementação, Diretrizes de Políticas e Checklist de Auditoria.

***

## Especificação Técnica LGPD para Site Estático (Jekyll + GA4 + Maps)

### 1. Matriz de Requisitos Técnicos LGPD para Site Estático

Esta matriz detalha os requisitos funcionais de compliance, mapeando-os para a arquitetura estática sem backend.

| ID | Requisito Funcional | Base Legal/Artigo LGPD | Critério de Aceitação Técnico |
| :--- | :--- | :--- | :--- |
| LGPD-001 | **Bloqueio Pré-Consentimento de Rastreamento** | Art. 7º, I e Art. 11, I | Todos os *scripts* de terceiros (GA4, Google Maps) devem ser carregados *apenas* após o usuário conceder consentimento explícito via `localStorage` ou intercepção de evento. O carregamento inicial deve ser nulo. |
| LGPD-002 | **Consentimento Granular e Persistente** | Art. 7º, I, IX | O sistema deve apresentar um *banner* modal/fixo que permite ao usuário selecionar categorias: 1. Essenciais (Obrigatório); 2. Analítico (GA4); 3. Funcional/Localização (Google Maps). As preferências devem ser salvas em `localStorage` e persistentes até a revogação. |
| LGPD-003 | **Mecanismo de Revogação Fácil (Opt-Out)** | Art. 8º | Deve existir um botão flutuante, discreto e sempre visível (ex: no canto inferior direito), que permita ao usuário revisar e revogar *qualquer* consentimento concedido previamente, acionando a remoção de *cookies* e a inativação dos scripts. |
| LGPD-004 | **Integração com Google Consent Mode v2 (GA4)** | LGPD - Transferência Internacional/Anonimização | O código de inicialização do GA4 deve ser envolto e usar os métodos `gtag('consent', 'update', { 'analytics_storage': 'denied' })` e subsequentes chamadas `gtag('consent', 'update', { 'analytics_storage': 'granted' })` baseados na escolha do usuário. |
| LGPD-005 | **Carregamento Dinâmico do Serviço de Terceiros** | Art. 7º, I | O widget do Google Maps (iframe ou script de API) só pode ser injetado no DOM após o consentimento específico para funcionalidade/terceiros ser confirmado. Caso contrário, deve ser renderizado um *placeholder* descritivo e estático. |

***

### 2. Implementação Técnica no Jekyll

#### A) Componente de Consentimento (`_includes/cookie-consent.html`)

Este componente fornece a estrutura visual e os *hooks* para o JavaScript.

```html _includes/cookie-consent.html
<div id="cookie-consent-banner" class="privacy-banner" role="dialog" aria-modal="true" aria-labelledby="consent-title">
    <div class="banner-content">
        <h3 id="consent-title">Sua Privacidade é Importante</h3>
        <p>Para melhorar sua experiência, utilizamos cookies e serviços de terceiros. Por favor, defina suas preferências de uso de dados, em conformidade com a LGPD.</p>
        
        <div class="consent-options">
            <label for="analytics-consent" class="option-label">
                <input type="checkbox" id="analytics-consent" data-service="analytics" checked> 
                Análise de Tráfego (Google Analytics 4)
            </label>
            
            <label for="functional-consent" class="option-label">
                <input type="checkbox" id="functional-consent" data-service="functional" checked> 
                Funcionalidades e Localização (Google Maps)
            </label>
        </div>
        
        <div class="consent-buttons">
            <button id="reject-all-btn" class="btn btn-secondary">Rejeitar Selecionados</button>
            <button id="accept-all-btn" class="btn btn-primary">Aceitar Tudo</button>
        </div>
    </div>
</div>

<!-- Botão de Revogação Flutuante (sempre visível após interagir ou como fallback) -->
<button id="privacy-toggle-btn" class="floating-toggle" title="Gerenciar Preferências de Privacidade">⚙️</button>
```

#### B) Gerenciador de Cookies e Serviços (`assets/js/cookie-manager.js`)

Este arquivo encapsula toda a lógica de *compliance* e carregamento condicional.

```javascript assets/js/cookie-manager.js
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
```

#### C) Layout Principal (`_layouts/default.html`)

Este layout deve envolver o conteúdo principal (`{{ content }}`) para aplicar o controle de privacidade nos serviços.

```liquid _layouts/default.html
<!DOCTYPE html>
<html lang="{{ site.language | default: 'pt' }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page.title | default: site.title }}</title>
    <link rel="stylesheet" href="{{ "assets/css/style.css" | relative_url }}">
    {% comment %} CSS embutido para o banner de consentimento deve ser linkado aqui ou em um arquivo dedicado {% endcomment %}
</head>
<body>
    
    {# 1. Incluir o banner de consentimento no topo do body #}
    {% include cookie-consent %}

    <header>
        <!-- Conteúdo do Header (sem scripts de terceiros) -->
    </header>

    <main id="content-wrapper">
        {{ content }}
    </main>

    <footer>
        <!-- Conteúdo do Footer -->
    </footer>

    <script src="{{ "assets/js/cookie-manager.js" | relative_url }}" defer></script>

    {# 2. Envolvimento dos scripts de terceiros - DEVE SER O ÚLTIMO ELEMENTO BODY #}
    {% comment %} 
    ESTE BLOCO É UM PLACEHOLDER PARA O JAVASCRIPT DE CARREGAMENTO DO GA4 E MAPS.
    Os scripts originais nunca devem ser incluídos diretamente, pois violam o LGPD-001. 
    A lógica de carregamento (gtag() ou API Key) deve ser chamada *após* o consentimento.
    {% endcomment %}
    <div id="third-party-scripts">
        <!-- Aqui, após o JS carregar, o cookie-manager.js deve chamar: -->
        <!-- 1. Inicialização do GA4 (somente se consentido) -->
        <!-- 2. Inicialização do Google Maps (somente se consentido) -->
    </div>
</body>
</html>
```

### 3. Requisitos para Termo de Uso e Política de Privacidade do Site

Estes textos devem ser criados em páginas dedicadas (`/politica-privacidade.md`, `/termos-uso.md`) e formatados em Markdown.

**Diretrizes obrigatórias para a Política de Privacidade:**

1.  **Finalidades de Tratamento:** Listar explicitamente as finalidades: (a) Garantir o funcionamento do site (Cookies Essenciais); (b) Melhorar a experiência do usuário e análise de tendências (GA4); (c) Fornecer serviços geográficos precisos (Google Maps API).
2.  **Base Legal:** Mencionar a base legal para cada coleta (Consentimento Explícito, Execução de Contrato, etc.), conforme o Art. 7º da LGPD.
3.  **Processamento de Dados de Terceiros:** Deve haver um tópico dedicado à **Transferência Internacional de Dados**, explicitando que o Google Analytics 4 e o Google Maps processam dados em servidores fora do Brasil, e que o usuário, ao consentir, está ciente dessa transferência.
4.  **Dados Coletados:** Detalhar que, em caso de uso do Mapa, são coletados *coordenadas geográficas (latitude/longitude)*, e em caso de GA4, são coletados *IDs de dispositivo/browser* e *timeline de navegação*.
5.  **Retenção e Revogação:** Informar de forma clara como o usuário pode exercer seus direitos de acesso, correção e revogação do consentimento (referenciando o mecanismo do banner de cookies).

**Diretrizes obrigatórias para os Termos de Uso:**

1.  **Direitos de Uso:** Definir que o uso do site está condicionado à aceitação dos termos de privacidade e ao aceite de cookies (vínculo direto entre Termos e Privacidade).
2.  **Limitação de Responsabilidade:** Deixar claro que o site é um repositório de informação e não fornece aconselhamento legal/financeiro/médico.

### 4. Checklist de Validação e Auditoria de Privacidade

Para validar a conformidade do código localmente, siga estes 5 passos de auditoria:

1.  **Verificação de Carregamento Inicial (Inspeção de Rede):** Carregue a página **sem aceitar nada**. No DevTools -> Network tab, verifique se não há requisições HTTP/S destinadas a `google-analytics.com` ou APIs de Maps antes de qualquer interação do usuário.
2.  **Teste de Bloqueio de Serviço:** Verifique o *placeholder* do mapa. Ele deve ser visível e o código de mapa não deve ter sido injetado no DOM.
3.  **Teste de Consentimento Total:** Clique em "Aceitar Tudo". No Network tab, você deve observar um pico de requisições para GA4 e/ou APIs do Maps, confirmando que o script de rastreamento foi acionado.
4.  **Teste de Revogação (O Teste Crítico):** Após aceitar tudo (e confirmar o tráfego), utilize o botão flutuante (⚙️) para **desmarcar o Analytics**. Recarregue a página. O tráfego de rastreamento deve cessar, e o valor salvo em `localStorage` deve refletir o estado "denied" para analytics.
5.  **Verificação de Cookies/Storage:** No DevTools -> Application tab, inspecione `localStorage`. Deve haver o item `user_privacy_consent` refletindo os booleanos corretos, e os cookies de sessão de terceiros devem ser inexistentes ou bloqueados de acordo com o estado salvo.