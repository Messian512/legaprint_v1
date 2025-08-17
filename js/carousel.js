//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');

let timeRunning = 3000;
let timeAutoNext = 7000;
let animationDurationMs = 800; // sync with CSS keyframe durations

// Swap button functions
if (nextDom) {
    nextDom.onclick = function(){
        showSlider('prev');    
    }
}

if (prevDom) {
    prevDom.onclick = function(){
        showSlider('next');    
    }
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    showSlider('next');
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    // Keep .next/.prev class during animation without blocking buttons
    setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, animationDurationMs); // image animation duration must match CSS

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        showSlider('next');
    }, timeAutoNext)
}

// Auto-adjust .carousel height based on header height
(function() {
    function setCarouselHeight() {
        var header = document.querySelector('.site-header');
        var carousel = document.querySelector('.carousel');
        if (!header || !carousel) return;
        var headerHeight = header.offsetHeight;
        carousel.style.height = 'calc(100vh - ' + headerHeight + 'px)';
    }
    window.addEventListener('resize', setCarouselHeight);
    window.addEventListener('DOMContentLoaded', setCarouselHeight);
})();

// Swipe support (mobile and desktop) using Pointer Events
(function(){
    if (!carouselDom) return;
    let startX = null;
    let isPointerDown = false;
    const swipeThreshold = 40; // px

    function onPointerDown(e){
        isPointerDown = true;
        startX = e.clientX;
        if (e.pointerId && carouselDom.setPointerCapture) {
            try { carouselDom.setPointerCapture(e.pointerId); } catch (err) {}
        }
        clearTimeout(runNextAuto);
    }

    function onPointerUp(e){
        if (!isPointerDown) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > swipeThreshold){
            if (dx < 0){
                showSlider('next');
            } else {
                showSlider('prev');
            }
        } else {
            clearTimeout(runNextAuto);
            runNextAuto = setTimeout(() => { showSlider('next'); }, timeAutoNext);
        }
        isPointerDown = false;
        startX = null;
        if (e.pointerId && carouselDom.releasePointerCapture) {
            try { carouselDom.releasePointerCapture(e.pointerId); } catch (err) {}
        }
    }

    function onPointerCancel(e){
        isPointerDown = false;
        startX = null;
        if (e.pointerId && carouselDom.releasePointerCapture) {
            try { carouselDom.releasePointerCapture(e.pointerId); } catch (err) {}
        }
    }

    carouselDom.addEventListener('pointerdown', onPointerDown, { passive: true });
    carouselDom.addEventListener('pointerup', onPointerUp, { passive: true });
    carouselDom.addEventListener('pointercancel', onPointerCancel, { passive: true });
    carouselDom.addEventListener('pointerleave', onPointerCancel, { passive: true });
})();