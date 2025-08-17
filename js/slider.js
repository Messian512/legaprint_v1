// Lightweight vanilla JS slider
(function() {
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow-left');
    const nextBtn = document.querySelector('.slider-arrow-right');
    let current = 0;
    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
            dots[i].classList.toggle('active', i === idx);
        });
        current = idx;
    }
    function prev() {
        showSlide((current - 1 + slides.length) % slides.length);
    }
    function next() {
        showSlide((current + 1) % slides.length);
    }
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });
    // Swipe support (mobile)
    let startX = null;
    document.querySelector('.slider').addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    document.querySelector('.slider').addEventListener('touchend', e => {
        if (startX === null) return;
        let dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) {
            if (dx > 0) prev(); else next();
        }
        startX = null;
    });
})();
