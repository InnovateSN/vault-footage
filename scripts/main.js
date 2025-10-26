document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-scroll]');
  if (!el) return;
  e.preventDefault();
  const id = el.getAttribute('href') || '#';
  const target = document.querySelector(id);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelectorAll('[data-plan]').forEach((cta) => {
  cta.addEventListener('click', (e) => {
    console.info('Checkout click:', e.currentTarget.dataset.plan);
  });
});
