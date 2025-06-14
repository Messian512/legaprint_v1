// Новый скрипт для простого прямоугольного свитчера
(function() {
    const toggleInput = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        toggleInput.checked = theme === 'dark';
    }

    function toggleTheme() {
        setTheme(toggleInput.checked ? 'dark' : 'light');
    }

    toggleInput.addEventListener('change', toggleTheme);
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
})();
