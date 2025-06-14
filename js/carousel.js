//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');

let timeRunning = 3000;
let timeAutoNext = 7000;

// Меняем местами функции кнопок
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
    // Оставляем класс .next/.prev на время анимации, но не блокируем кнопки
    setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, 500); // 500мс = длительность анимации появления картинки

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext)
}

// Автоматическая адаптация высоты .carousel под высоту header
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