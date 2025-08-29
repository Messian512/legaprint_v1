// Products A: tabs + slideshow per type
(function(){
    const productsA = document.querySelector('.products-a');
    if (!productsA) return;
    const buttons = Array.from(productsA.querySelectorAll('.products-a-btn'));
    const track = productsA.querySelector('.products-a-track');
    const descWrap = productsA.querySelector('.products-a-descriptions');

    let currentType = 1;
    let isAnimating = false;
    let rafId = null;
    let positionX = 0;
    let speed = 0.25; // px per frame

    function getTypeSrc(type){
        return `assets/image/products/product_typeA_${type}.jpg`;
    }

    function clearTrack(){
        if (!track) return;
        track.innerHTML = '';
        positionX = 0;
        track.style.transform = 'translateX(0)';
    }

    function fillTrackSingle(src){
        if (!track) return;
        const fragment = document.createDocumentFragment();
        const makeImg = (s) => {
            const img = document.createElement('img');
            img.className = 'products-a-slide';
            img.src = s;
            img.alt = '';
            img.decoding = 'async';
            img.loading = 'lazy';
            return img;
        };
        // Duplicate the single image a few times to enable seamless loop
        for (let i = 0; i < 3; i++){
            fragment.appendChild(makeImg(src));
        }
        track.appendChild(fragment);
    }

    function startAnimation(){
        if (isAnimating || !track) return;
        isAnimating = true;
        const step = () => {
            const first = track.firstElementChild;
            if (first){
                const firstWidth = first.getBoundingClientRect().width;
                positionX -= speed;
                // when the first slide is fully out of view, move it to the end
                if (-positionX >= firstWidth){
                    positionX += firstWidth;
                    track.appendChild(first);
                }
                track.style.transform = `translateX(${positionX}px)`;
            }
            rafId = requestAnimationFrame(step);
        };
        rafId = requestAnimationFrame(step);
    }

    function stopAnimation(){
        if (!isAnimating) return;
        cancelAnimationFrame(rafId);
        isAnimating = false;
        rafId = null;
    }

    function updateDesc(type){
        if (!descWrap) return;
        const all = Array.from(descWrap.querySelectorAll('.products-a-desc'));
        all.forEach(el => el.classList.toggle('is-active', Number(el.dataset.type) === type));
    }

    async function selectType(type){
        currentType = type;
        buttons.forEach(btn => {
            const isActive = Number(btn.dataset.type) === type;
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        updateDesc(type);
        stopAnimation();
        clearTrack();
        const src = getTypeSrc(type);
        fillTrackSingle(src);
        startAnimation();
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = Number(btn.dataset.type);
            if (!type || type === currentType) return;
            selectType(type);
        });
    });

    // init
    selectType(currentType);
})();


// Products B: tabs + slideshow per type
(function(){
    const root = document.querySelector('.products-b');
    if (!root) return;
    const buttons = Array.from(root.querySelectorAll('.products-b-btn'));
    const track = root.querySelector('.products-b-track');
    const descWrap = root.querySelector('.products-b-descriptions');

    let currentType = 1;
    let isAnimating = false;
    let rafId = null;
    let positionX = 0;
    let speed = 0.25;

    function getTypeSrc(type){
        return `assets/image/products/product_typeB_${type}.jpg`;
    }

    function clearTrack(){
        if (!track) return;
        track.innerHTML = '';
        positionX = 0;
        track.style.transform = 'translateX(0)';
    }

    function fillTrackSingle(src){
        if (!track) return;
        const fragment = document.createDocumentFragment();
        const makeImg = (s) => {
            const img = document.createElement('img');
            img.className = 'products-b-slide';
            img.src = s;
            img.alt = '';
            img.decoding = 'async';
            img.loading = 'lazy';
            return img;
        };
        for (let i = 0; i < 3; i++){
            fragment.appendChild(makeImg(src));
        }
        track.appendChild(fragment);
    }

    function startAnimation(){
        if (isAnimating || !track) return;
        isAnimating = true;
        const step = () => {
            const first = track.firstElementChild;
            if (first){
                const firstWidth = first.getBoundingClientRect().width;
                positionX -= speed;
                if (-positionX >= firstWidth){
                    positionX += firstWidth;
                    track.appendChild(first);
                }
                track.style.transform = `translateX(${positionX}px)`;
            }
            rafId = requestAnimationFrame(step);
        };
        rafId = requestAnimationFrame(step);
    }

    function stopAnimation(){
        if (!isAnimating) return;
        cancelAnimationFrame(rafId);
        isAnimating = false;
        rafId = null;
    }

    function updateDesc(type){
        if (!descWrap) return;
        const all = Array.from(descWrap.querySelectorAll('.products-b-desc'));
        all.forEach(el => el.classList.toggle('is-active', Number(el.dataset.type) === type));
    }

    async function selectType(type){
        currentType = type;
        buttons.forEach(btn => {
            const isActive = Number(btn.dataset.type) === type;
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        updateDesc(type);
        stopAnimation();
        clearTrack();
        const src = getTypeSrc(type);
        fillTrackSingle(src);
        startAnimation();
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = Number(btn.dataset.type);
            if (!type || type === currentType) return;
            selectType(type);
        });
    });

    selectType(currentType);
})();

// Products C: tabs + slideshow per type
(function(){
    const root = document.querySelector('.products-c');
    if (!root) return;
    const buttons = Array.from(root.querySelectorAll('.products-c-btn'));
    const track = root.querySelector('.products-c-track');
    const descWrap = root.querySelector('.products-c-descriptions');

    let currentType = 1;
    let isAnimating = false;
    let rafId = null;
    let positionX = 0;
    let speed = 0.25;

    function getTypeSrc(type){
        return `assets/image/products/product_typeC_${type}.jpg`;
    }

    function clearTrack(){
        if (!track) return;
        track.innerHTML = '';
        positionX = 0;
        track.style.transform = 'translateX(0)';
    }

    function fillTrackSingle(src){
        if (!track) return;
        const fragment = document.createDocumentFragment();
        const makeImg = (s) => {
            const img = document.createElement('img');
            img.className = 'products-c-slide';
            img.src = s;
            img.alt = '';
            img.decoding = 'async';
            img.loading = 'lazy';
            return img;
        };
        for (let i = 0; i < 3; i++){
            fragment.appendChild(makeImg(src));
        }
        track.appendChild(fragment);
    }

    function startAnimation(){
        if (isAnimating || !track) return;
        isAnimating = true;
        const step = () => {
            const first = track.firstElementChild;
            if (first){
                const firstWidth = first.getBoundingClientRect().width;
                positionX -= speed;
                if (-positionX >= firstWidth){
                    positionX += firstWidth;
                    track.appendChild(first);
                }
                track.style.transform = `translateX(${positionX}px)`;
            }
            rafId = requestAnimationFrame(step);
        };
        rafId = requestAnimationFrame(step);
    }

    function stopAnimation(){
        if (!isAnimating) return;
        cancelAnimationFrame(rafId);
        isAnimating = false;
        rafId = null;
    }

    function updateDesc(type){
        if (!descWrap) return;
        const all = Array.from(descWrap.querySelectorAll('.products-c-desc'));
        all.forEach(el => el.classList.toggle('is-active', Number(el.dataset.type) === type));
    }

    async function selectType(type){
        currentType = type;
        buttons.forEach(btn => {
            const isActive = Number(btn.dataset.type) === type;
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        updateDesc(type);
        stopAnimation();
        clearTrack();
        const src = getTypeSrc(type);
        fillTrackSingle(src);
        startAnimation();
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = Number(btn.dataset.type);
            if (!type || type === currentType) return;
            selectType(type);
        });
    });

    selectType(currentType);
})();

