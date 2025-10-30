(function () {
  var BASE_URL = 'https://innovatesol.gumroad.com/l/';
  var SLUGS = {
    monthly: 'yzbjnq',
    yearly: 'nfqwgu',
    lifetime: 'udlsih'
  };

  function resolveSlug(key) {
    return SLUGS[key] || key;
  }

  function ensureHref(anchor) {
    if (!anchor) return;
    var slug = anchor.getAttribute('data-gumroad');
    if (!slug) return;
    var desiredHref = BASE_URL + resolveSlug(slug);
    if (anchor.getAttribute('href') !== desiredHref) {
      anchor.setAttribute('href', desiredHref);
    }
    if (anchor.getAttribute('target') !== '_blank') {
      anchor.setAttribute('target', '_blank');
    }
    var rel = anchor.getAttribute('rel');
    if (!rel) {
      anchor.setAttribute('rel', 'noopener');
    } else if (!/noopener/.test(rel)) {
      anchor.setAttribute('rel', rel + ' noopener');
    }
  }

  function hasGumroadIframe() {
    return !!document.querySelector('iframe[src*="gumroad.com" i]');
  }

  function hydrateAll() {
    var buttons = document.querySelectorAll('a.gumroad-button');
    buttons.forEach(ensureHref);
  }

  function scheduleFallback(event, anchor) {
    if (!anchor) return;
    var href = anchor.getAttribute('href');
    if (!href) return;

    window.setTimeout(function () {
      if (!event.defaultPrevented) {
        return;
      }
      if (hasGumroadIframe()) {
        return;
      }
      var opened = window.open(href, '_blank', 'noopener');
      if (!opened) {
        window.location.href = href;
      }
    }, 2000);
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
    scheduleFallback(event, anchor);
  }, true);
})();
