/* ===========================================================
   DAME ORNIBEST — script.js (partagé par toutes les pages)

   1. Petit outil de stockage (mémorise thème et langue)
   2. Étoiles
   3. Mode jour / nuit
   4. Langue FR / EN
   5. Menu hamburger + sous-menus
   6. Recherche
   7. Formulaires newsletter
   =========================================================== */
(function () {
    'use strict';

    var doc = document.documentElement;

    /* ───── 1. Stockage (ne plante pas si le navigateur le bloque) ───── */
    var store = {
        get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* rien */ } }
    };

    /* Textes de l'interface qui changent avec la langue (FR, EN) */
    var UI = {
        toDay:   ['Mode jour', 'Day mode'],
        toNight: ['Mode nuit', 'Night mode'],
        toDayAria:   ['Passer en mode jour', 'Switch to day mode'],
        toNightAria: ['Passer en mode nuit', 'Switch to night mode'],
        noResult: ['Aucun résultat', 'No results'],
        newsletterNoService: [
            'Merci pour ton intérêt ! Pour t\'inscrire, écris-moi sur mes réseaux : je t\'ajoute à la liste.',
            'Thank you for your interest! To subscribe, message me on social media and I will add you to the list.'
        ],
        emailMissing: ['Écris ton adresse e-mail pour continuer.', 'Please enter your email address.']
    };

    var lang = store.get('ornibest-lang') === 'en' ? 'en' : 'fr';
    var L = function (pair) { return pair[lang === 'en' ? 1 : 0]; };


    /* ───── 2. Étoiles ───── */
    (function () {
        var box = document.getElementById('stars');
        if (!box) { return; }
        for (var i = 0; i < 100; i++) {
            var s = document.createElement('div');
            s.className = 'star';
            s.style.left = Math.random() * 100 + '%';
            s.style.top = Math.random() * 100 + '%';
            s.style.animationDelay = Math.random() * 3 + 's';
            box.appendChild(s);
        }
    })();


    /* ───── 3. Mode jour / nuit ───── */
    function currentTheme() {
        return doc.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    function paintThemeButtons() {
        var isLight = currentTheme() === 'light';
        document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
            // le bouton montre le mode vers lequel on bascule
            btn.innerHTML = '<span class="ico" aria-hidden="true">' + (isLight ? '🌙' : '☀️') + '</span>' +
                '<span class="label">' + L(isLight ? UI.toNight : UI.toDay) + '</span>';
            btn.setAttribute('aria-label', L(isLight ? UI.toNightAria : UI.toDayAria));
        });
    }

    function setTheme(theme) {
        if (theme === 'light') { doc.setAttribute('data-theme', 'light'); }
        else { doc.removeAttribute('data-theme'); }
        store.set('ornibest-theme', theme);
        paintThemeButtons();
    }

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            setTheme(currentTheme() === 'light' ? 'dark' : 'light');
        });
    });


    /* ───── 4. Langue FR / EN ─────
       Tout élément qui a un attribut data-en est traduit :
         <span data-en="Hello">Bonjour</span>
       Le texte français est lu dans la page au premier passage.
       (data-html : le texte contient du HTML.)
       Pour les attributs : data-en-aria-label, data-en-placeholder. */
    function applyLang(l) {
        lang = l === 'en' ? 'en' : 'fr';
        doc.setAttribute('lang', lang);

        document.querySelectorAll('[data-en]').forEach(function (el) {
            var html = el.hasAttribute('data-html');
            if (el._fr === undefined) { el._fr = html ? el.innerHTML : el.textContent; }
            var value = lang === 'en' ? el.getAttribute('data-en') : el._fr;
            if (html) { el.innerHTML = value; } else { el.textContent = value; }
        });

        ['aria-label', 'placeholder'].forEach(function (attr) {
            document.querySelectorAll('[data-en-' + attr + ']').forEach(function (el) {
                var key = '_fr_' + attr;
                if (el[key] === undefined) { el[key] = el.getAttribute(attr) || ''; }
                el.setAttribute(attr, lang === 'en' ? el.getAttribute('data-en-' + attr) : el[key]);
            });
        });

        document.querySelectorAll('[data-lang-set]').forEach(function (btn) {
            btn.setAttribute('aria-pressed', btn.getAttribute('data-lang-set') === lang ? 'true' : 'false');
        });

        paintThemeButtons();
        var input = document.getElementById('search-input');
        if (input && input.value) { runSearch(input.value); }
    }

    document.querySelectorAll('[data-lang-set]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var l = btn.getAttribute('data-lang-set');
            store.set('ornibest-lang', l);
            applyLang(l);
        });
    });


    /* ───── 5. Menu hamburger + sous-menus ───── */
    var header = document.querySelector('.site-header');
    var menuBtn = document.getElementById('menu-toggle');
    var menu = document.getElementById('mobile-menu');

    function setHeaderHeight() {
        if (header) { doc.style.setProperty('--header-h', header.offsetHeight + 'px'); }
    }

    function setMenu(open) {
        if (!menu || !menuBtn) { return; }
        menu.hidden = !open;
        menuBtn.classList.toggle('is-open', open);
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('menu-lock', open);
        if (open) { setHeaderHeight(); closeSearch(); }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    }

    // Si l'écran s'agrandit, le menu mobile se referme
    var desktop = window.matchMedia('(min-width: 1100px)');
    var onDesktop = function () { if (desktop.matches) { setMenu(false); } setHeaderHeight(); };
    if (desktop.addEventListener) { desktop.addEventListener('change', onDesktop); }
    window.addEventListener('resize', setHeaderHeight);

    // Sous-menus : le petit signe ▾ déroule / replie
    function closeDropdowns(except) {
        document.querySelectorAll('.nav-item.open').forEach(function (item) {
            if (item === except) { return; }
            item.classList.remove('open');
            var b = item.querySelector('.sub-toggle');
            if (b) { b.setAttribute('aria-expanded', 'false'); }
        });
    }

    document.querySelectorAll('.sub-toggle').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var item = btn.closest('.nav-item');
            var willOpen = !item.classList.contains('open');
            closeDropdowns(item);
            item.classList.toggle('open', willOpen);
            btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        });
    });

    // Clic en dehors des menus du header / de la planète : on referme
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-item')) { closeDropdowns(null); }
        if (!e.target.closest('.search-panel') && !e.target.closest('[data-search-open]')) { closeSearch(); }
    });

    // Menu secondaire des planètes sur petit écran
    document.querySelectorAll('.subnav-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var nav = btn.closest('.subnav');
            var open = !nav.classList.contains('is-open');
            nav.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    });

    // Un clic sur un lien du menu mobile referme le menu
    if (menu) {
        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) { setMenu(false); }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') { return; }
        closeDropdowns(null);
        closeSearch();
        if (menu && !menu.hidden) { setMenu(false); if (menuBtn) { menuBtn.focus(); } }
    });


    /* ───── 6. Recherche ───── */
    var panel = document.getElementById('search-panel');
    var input = document.getElementById('search-input');
    var results = document.getElementById('search-results');

    function norm(s) {
        return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    }

    function runSearch(q) {
        if (!results) { return; }
        results.innerHTML = '';
        var query = norm(q).trim();
        if (!query) { return; }

        var found = (window.SITE_INDEX || []).filter(function (entry) {
            var hay = norm(entry.fr + ' ' + entry.en + ' ' + (entry.kw || ''));
            return query.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
        }).slice(0, 8);

        if (!found.length) {
            var none = document.createElement('li');
            none.className = 'r-none';
            none.textContent = L(UI.noResult);
            results.appendChild(none);
            return;
        }

        found.forEach(function (entry) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = entry.url;
            var t = document.createElement('span');
            t.textContent = lang === 'en' ? entry.en : entry.fr;
            var k = document.createElement('span');
            k.className = 'r-type';
            k.textContent = lang === 'en' ? entry.type_en : entry.type_fr;
            a.appendChild(t);
            a.appendChild(k);
            li.appendChild(a);
            results.appendChild(li);
        });
    }

    function openSearch() {
        if (!panel) { return; }
        setMenu(false);
        panel.hidden = false;
        document.querySelectorAll('[data-search-open]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
        if (input) { input.focus(); }
    }

    function closeSearch() {
        if (!panel || panel.hidden) { return; }
        panel.hidden = true;
        document.querySelectorAll('[data-search-open]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    }

    document.querySelectorAll('[data-search-open]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (panel.hidden) { openSearch(); } else { closeSearch(); }
        });
    });

    if (input) {
        input.addEventListener('input', function () { runSearch(input.value); });
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                var first = results.querySelector('a');
                if (first) { window.location.href = first.href; }
            }
        });
    }


    /* ───── 7. Formulaires newsletter ─────
       Si `newsletter_action` est rempli dans _config.yml, le formulaire est envoyé à ce service.
       Sinon, un message invite à s'inscrire via les réseaux. */
    document.querySelectorAll('form[data-newsletter]').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            var msg = form.parentNode.querySelector('.form-msg');
            var email = form.querySelector('input[type="email"]');
            var filled = email && email.value.trim();
            if (!filled) {
                e.preventDefault();
                if (msg) { msg.textContent = L(UI.emailMissing); }
                return;
            }
            if (form.getAttribute('action')) { return; }   // envoi réel vers ton service
            e.preventDefault();
            if (msg) { msg.textContent = L(UI.newsletterNoService); }
        });
    });


    /* ───── Démarrage ───── */
    paintThemeButtons();
    if (lang === 'en') { applyLang('en'); }
    else {
        document.querySelectorAll('[data-lang-set]').forEach(function (btn) {
            btn.setAttribute('aria-pressed', btn.getAttribute('data-lang-set') === 'fr' ? 'true' : 'false');
        });
    }
    setHeaderHeight();
    window.addEventListener('load', setHeaderHeight);
})();
