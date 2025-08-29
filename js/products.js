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

    function buildImagePath(type, index){
        return `assets/image/products/product_typeA_${type}_${index}.jpg`;
    }

    function preload(src){
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    async function gatherImages(type){
        const urls = [];
        for (let i = 1; i <= 20; i++){
            const src = buildImagePath(type, i);
            // eslint-disable-next-line no-await-in-loop
            const ok = await preload(src);
            if (!ok) continue;
            urls.push(src);
        }
        return urls;
    }

    function clearTrack(){
        if (!track) return;
        track.innerHTML = '';
        positionX = 0;
        track.style.transform = 'translateX(0)';
    }

    function fillTrack(urls){
        if (!track) return;
        const fragment = document.createDocumentFragment();
        const makeImg = (src) => {
            const img = document.createElement('img');
            img.className = 'products-a-slide';
            img.src = src;
            img.alt = '';
            img.decoding = 'async';
            img.loading = 'lazy';
            return img;
        };
        // Add two sequences for seamless loop
        [urls, urls].forEach(seq => seq.forEach(src => fragment.appendChild(makeImg(src))));
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
        const urls = await gatherImages(type);
        if (!urls.length) return;
        fillTrack(urls);
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

    function buildImagePath(type, index){
        return `assets/image/products/product_typeB_${type}_${index}.jpg`;
    }

    function preload(src){
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    async function gatherImages(type){
        const urls = [];
        for (let i = 1; i <= 20; i++){
            const src = buildImagePath(type, i);
            // eslint-disable-next-line no-await-in-loop
            const ok = await preload(src);
            if (!ok) continue;
            urls.push(src);
        }
        return urls;
    }

    function clearTrack(){
        if (!track) return;
        track.innerHTML = '';
        positionX = 0;
        track.style.transform = 'translateX(0)';
    }

    function fillTrack(urls){
        if (!track) return;
        const fragment = document.createDocumentFragment();
        const makeImg = (src) => {
            const img = document.createElement('img');
            img.className = 'products-b-slide';
            img.src = src;
            img.alt = '';
            img.decoding = 'async';
            img.loading = 'lazy';
            return img;
        };
        [urls, urls].forEach(seq => seq.forEach(src => fragment.appendChild(makeImg(src))));
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
        const urls = await gatherImages(type);
        if (!urls.length) return;
        fillTrack(urls);
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

    function buildImagePath(type, index){
        return `assets/image/products/product_typeC_${type}_${index}.jpg`;
    }

    function preload(src){
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    async function gatherImages(type){
        const urls = [];
        for (let i = 1; i <= 20; i++){
            const src = buildImagePath(type, i);
            // eslint-disable-next-line no-await-in-loop
            const ok = await preload(src);
            if (!ok) continue;
            urls.push(src);
        }
        return urls;
    }

    function clearTrack(){
        if (!track) return;
        track.innerHTML = '';
        positionX = 0;
        track.style.transform = 'translateX(0)';
    }

    function fillTrack(urls){
        if (!track) return;
        const fragment = document.createDocumentFragment();
        const makeImg = (src) => {
            const img = document.createElement('img');
            img.className = 'products-c-slide';
            img.src = src;
            img.alt = '';
            img.decoding = 'async';
            img.loading = 'lazy';
            return img;
        };
        [urls, urls].forEach(seq => seq.forEach(src => fragment.appendChild(makeImg(src))));
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
        const urls = await gatherImages(type);
        if (!urls.length) return;
        fillTrack(urls);
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

