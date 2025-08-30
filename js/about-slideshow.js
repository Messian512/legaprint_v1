(function(){
    const wrap = document.querySelector('.about-slideshow');
    if (!wrap) return;
    const base = wrap.querySelector('.about-base');
    const overlay = wrap.querySelector('.about-overlay');
    if (!base || !overlay) return;

    async function loadImagesFromManifest(){
        try {
            const response = await fetch('assets/image/about_company_manifest.json', { cache: 'no-cache' });
            if (!response.ok) throw new Error('manifest fetch failed');
            const manifest = await response.json();
            if (!Array.isArray(manifest)) return [];
            const candidates = manifest.filter(item => typeof item === 'string' && item.trim().length > 0);
            const results = await Promise.all(candidates.map(src => preload(src).then(ok => (ok ? src : null))));
            return results.filter(Boolean);
        } catch (err) {
            return [];
        }
    }

    function preload(src){
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    // images are listed explicitly in the manifest; no guessing of filenames

    (async function init(){
        const images = await loadImagesFromManifest();
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

        setInterval(next, 5000);
    })();
})();


