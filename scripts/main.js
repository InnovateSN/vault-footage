document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-scroll]');
  if (!link || link.tagName !== 'A') return;

  if (link.hostname === location.hostname && link.hash) {
    e.preventDefault();
    const target = document.querySelector(link.hash);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

document.querySelectorAll('[data-plan]').forEach((cta) => {
  cta.addEventListener('click', (e) => {
    const plan = e.currentTarget?.dataset?.plan;
    if (!plan) return;

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'plan_selected', { plan });
    }

    console.info('Checkout click:', plan);
  });
});

const bannerKey = 'dismissedBanner';

const renderTrialBanner = () => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const isTrialVisitor = params.get('plan') === 'trial10';

  if (!isTrialVisitor) return;

  try {
    if (window.localStorage?.getItem(bannerKey) === 'true') {
      return;
    }
  } catch (err) {
    // Ignore storage access errors and attempt to render the banner anyway
  }

  const root = document.getElementById('trial-banner-root');
  if (!root) return;

  const banner = document.createElement('section');
  banner.className = 'trial-banner';
  banner.setAttribute('role', 'status');
  banner.setAttribute('aria-live', 'polite');
  banner.innerHTML = `
    <div class="trial-banner__inner">
      <p class="trial-banner__text">You’re on the Trial 10 plan — upgrade anytime for unlimited access.</p>
      <div class="trial-banner__actions">
        <a class="trial-banner__cta" href="https://innovatesol.gumroad.com/l/yzbjnq?utm_source=banner" target="_blank" rel="noopener">Upgrade Now →</a>
        <button type="button" class="trial-banner__dismiss" data-dismiss-banner>Dismiss</button>
      </div>
    </div>
  `;

  const dismissButton = banner.querySelector('[data-dismiss-banner]');
  dismissButton?.addEventListener('click', () => {
    try {
      window.localStorage?.setItem(bannerKey, 'true');
    } catch (err) {
      // Ignore storage access errors
    }
    banner.remove();
  });

  root.replaceChildren(banner);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderTrialBanner);
} else {
  renderTrialBanner();
}

// TODO: send email + plan info to Make webhook
