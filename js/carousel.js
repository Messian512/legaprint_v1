//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');

let timeRunning = 3000;
let timeAutoNext = 7000;
let animationDurationMs = 800; // sync with CSS keyframe durations

// Swap button functions
nextDom.onclick = function(){
    showSlider('prev');    
}

prevDom.onclick = function(){
    showSlider('next');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
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
        nextDom.click();
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

// swipe support removed per request