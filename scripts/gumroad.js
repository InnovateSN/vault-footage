(function () {
  var BASE_URL = 'https://vaultfootage.gumroad.com/l/';
  var SLUGS = {
    monthly: 'lyzbjnq',
    yearly: 'nfqwgul',
    lifetime: 'udlsih'
  };

  function resolveSlug(key) {
    return SLUGS[key] || key;
  }

  function ensureHref(anchor) {
    if (!anchor) return;
    var slug = anchor.getAttribute('data-gumroad');
    if (!slug) return;
    if (!anchor.getAttribute('href')) {
      anchor.setAttribute('href', BASE_URL + resolveSlug(slug));
    }
    if (!anchor.getAttribute('target')) {
      anchor.setAttribute('target', '_blank');
    }
    var rel = anchor.getAttribute('rel');
    if (!rel) {
      anchor.setAttribute('rel', 'noopener');
    } else if (!/noopener/.test(rel)) {
      anchor.setAttribute('rel', rel + ' noopener');
    }
  }

  function hydrateAll() {
    var buttons = document.querySelectorAll('a.gumroad-button');
    buttons.forEach(ensureHref);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrateAll);
  } else {
    hydrateAll();
  }

  document.addEventListener('click', function (event) {
    var anchor = event.target.closest('a.gumroad-button');
    if (!anchor) return;
    ensureHref(anchor);
  }, true);
})();
