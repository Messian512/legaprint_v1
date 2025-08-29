(function(){
    const wrap = document.querySelector('.about-slideshow');
    if (!wrap) return;
    const base = wrap.querySelector('.about-base');
    const overlay = wrap.querySelector('.about-overlay');
    if (!base || !overlay) return;

    function buildCandidates(){
        const candidates = [];
        for (let i = 1; i <= 99; i++){
            const num = String(i).padStart(2, '0');
            candidates.push(`assets/image/about_company_${num}.jpg`);
        }
        return candidates;
    }

    function preload(src){
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    async function collectExisting(){
        const found = [];
        const list = buildCandidates();
        for (const src of list){
            // eslint-disable-next-line no-await-in-loop
            const ok = await preload(src);
            if (ok) found.push(src);
        }
        return found;
    }

    (async function init(){
        const images = await collectExisting();
        if (!images.length) return;
        let idx = 0;
        base.src = images[0];
        idx = 1 % images.length;

        function next(){
            const nextSrc = images[idx];
            overlay.src = nextSrc;
            wrap.classList.add('is-fading');
            setTimeout(() => {
                base.src = nextSrc;
                wrap.classList.remove('is-fading');
                idx = (idx + 1) % images.length;
            }, 2000);
        }

        setInterval(next, 7000);
    })();
})();


