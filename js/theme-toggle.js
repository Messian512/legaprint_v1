// Simple rectangular theme switcher script
(function() {
    const toggleInputs = [
        document.getElementById('theme-toggle'),
        document.getElementById('theme-toggle-desktop')
    ].filter(Boolean);
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const navBackdrop = document.querySelector('.nav-backdrop');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    // Keep CSS var with header height to offset main content
    function updateHeaderHeightVar(){
        const header = document.querySelector('.site-header');
        if (!header) return;
        const h = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', h + 'px');
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        toggleInputs.forEach(inp => inp.checked = theme === 'dark');
    }

    function toggleTheme(e) {
        const isDark = e && e.target ? e.target.checked : (savedTheme ? savedTheme === 'dark' : prefersDark);
        setTheme(isDark ? 'dark' : 'light');
    }

    toggleInputs.forEach(inp => inp.addEventListener('change', toggleTheme));
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    updateHeaderHeightVar();
    window.addEventListener('resize', updateHeaderHeightVar);

    // Navigation: burger menu
    if (navToggle && primaryNav) {
        function setNavOpen(isOpen){
            primaryNav.classList.toggle('is-open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (navBackdrop){
                if (isOpen){
                    navBackdrop.classList.add('is-visible');
                    navBackdrop.removeAttribute('hidden');
                } else {
                    navBackdrop.classList.remove('is-visible');
                    navBackdrop.setAttribute('hidden', '');
                }
            }
            document.body.classList.toggle('nav-open', isOpen);
        }
        navToggle.addEventListener('click', () => {
            const willOpen = !primaryNav.classList.contains('is-open');
            setNavOpen(willOpen);
        });
        // Close sidebar when clicking any nav link (except theme switcher)
        primaryNav.addEventListener('click', (e) => {
            if (!primaryNav.classList.contains('is-open')) return;
            const link = e.target && e.target.closest ? e.target.closest('a.menu-link, a.submenu-link') : null;
            if (!link) return;
            if (link.closest('.theme-switcher')) return;
            setNavOpen(false);
        });
        // Removed outside click and Esc key closing; keep only swipe and toggle button

        // Swipe-to-close for the sidebar on mobile
        let startX = null;
        let isPointerDown = false;
        const swipeCloseThreshold = 40; // px
        primaryNav.addEventListener('pointerdown', (e) => {
            if (!primaryNav.classList.contains('is-open')) return;
            isPointerDown = true;
            startX = e.clientX;
            if (e.pointerId && primaryNav.setPointerCapture) {
                try { primaryNav.setPointerCapture(e.pointerId); } catch (err) {}
            }
        }, { passive: true });
        function endSwipe(e){
            if (!isPointerDown) return;
            const dx = e.clientX - startX;
            if (dx > swipeCloseThreshold) {
                setNavOpen(false);
            }
            isPointerDown = false;
            startX = null;
            if (e.pointerId && primaryNav.releasePointerCapture) {
                try { primaryNav.releasePointerCapture(e.pointerId); } catch (err) {}
            }
        }
        primaryNav.addEventListener('pointerup', endSwipe, { passive: true });
        primaryNav.addEventListener('pointercancel', endSwipe, { passive: true });
        primaryNav.addEventListener('pointerleave', endSwipe, { passive: true });
    }

    // Dropdown: PRODUCTS
    (function(){
        const btn = document.querySelector('.menu-link-btn[aria-controls="submenu-products"]');
        const submenu = document.getElementById('submenu-products');
        if (!btn || !submenu) return;

        function toggleSubmenu(force){
            const willOpen = typeof force === 'boolean' ? force : !submenu.classList.contains('is-open');
            submenu.classList.toggle('is-open', willOpen);
            btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSubmenu();
        });

        // Close on outside click (desktop)
        document.addEventListener('click', (e) => {
            if (!submenu.classList.contains('is-open')) return;
            const target = e.target;
            if (target.closest('.menu-item')) return;
            toggleSubmenu(false);
        });

        // Close submenu after clicking a submenu link (also closes sidebar via existing handler)
        submenu.addEventListener('click', (e) => {
            const link = e.target && e.target.closest ? e.target.closest('a.submenu-link') : null;
            if (!link) return;
            toggleSubmenu(false);
        });
    })();
})();
