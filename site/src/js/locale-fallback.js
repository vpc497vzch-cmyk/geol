// Simple client-side locale fallback translations
(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return; // do not run during SSR

  function translateText(node, map) {
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      var txt = node.textContent.trim();
      if (map[txt]) node.textContent = node.textContent.replace(txt, map[txt]);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // replace element text
      if (node.childNodes && node.childNodes.length) {
        node.childNodes.forEach(function (child) { translateText(child, map); });
      }
    }
  }

  function applyTranslations(map) {
    // navbar labels
    var navSelectors = ['.navbar__items a', '.navbar__items button', '.navbar__title', '.navbar__brand'];
    navSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        // if element contains an image (logo), don't replace its textContent
        var img = el.querySelector && el.querySelector('img');
        if (img) {
          try {
            var alt = (img.getAttribute('alt') || '').trim();
            if (map[alt]) img.setAttribute('alt', map[alt]);
          } catch (e) {
            // ignore
          }
          return;
        }

        // try direct match on text nodes only
        el.childNodes.forEach(function (child) {
          if (child.nodeType === Node.TEXT_NODE) {
            var t = child.textContent.trim();
            if (map[t]) child.textContent = child.textContent.replace(t, map[t]);
          }
        });
      });
    });

    // footer
    document.querySelectorAll('footer a, footer span, footer p, footer h3').forEach(function (el) {
      var t = el.textContent.trim();
      if (map[t]) el.textContent = map[t];
    });

    // headings and common doc texts — replace only text nodes and skip interactive containers
    document.querySelectorAll('h1,h2,h3,h4,p,li,code').forEach(function (el) {
      // skip elements that contain interactive children (links, buttons, images)
      if (el.querySelector && el.querySelector('a,button,img')) return;
      // replace only text nodes to avoid removing child elements
      el.childNodes.forEach(function (child) {
        if (child.nodeType === Node.TEXT_NODE) {
          var t = child.textContent.trim();
          if (map[t]) child.textContent = child.textContent.replace(t, map[t]);
        }
      });
    });
  }

  function isFrenchPath() {
    return location.pathname.split('/')[1] === 'fr';
  }

  var translations = {
    'Search': 'Recherche',
    'Menu': 'Menu',
    'Tutorial': 'Tutoriel',
    'Releases': 'Releases',
    'Blog': 'Blog',
    'GitHub': 'GitHub',
    'geol': 'geol',
    'Software End Of Life management is too important to be  boring ': "La gestion de la fin de vie des logiciels est trop importante pour être ennuyeuse",
    'Docs': 'Docs',
    'Community': 'Communauté',
    'More': 'Plus',
    'YouTube Playlist': 'Playlist YouTube',
    'Project kanban': 'Kanban du projet',
    'Tutorial Intro': "Introduction au tutoriel",
    "Let's discover **geol in less than 5 minutes**.": "Découvrons **geol en moins de 5 minutes**.",
    'Getting Started': 'Pour commencer',
    "What you'll need": "Ce dont vous aurez besoin",
    'Get `geol` version': "Obtenir la version de `geol'",
    'Get help': 'Obtenir de l\'aide',
    'Get started by **installing with <code>brew</code>**.': 'Commencez par **installer avec <code>brew</code>**.',
  };

  function init() {
    if (isFrenchPath()) {
      // Wait for hydration
      document.addEventListener('DOMContentLoaded', function () {
        try { applyTranslations(translations); } catch (e) { console.warn('Locale fallback failed', e); }
      });
      // Also try after a short timeout for SPA navigation
      setTimeout(function () { try { applyTranslations(translations); } catch (e) {} }, 800);
    }
  }

  init();
})();
