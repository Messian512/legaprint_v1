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
        if (navBackdrop){
            navBackdrop.addEventListener('click', () => setNavOpen(false));
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setNavOpen(false);
        });
    }
})();
