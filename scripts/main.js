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

// TODO: send email + plan info to Make webhook
