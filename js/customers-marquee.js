// JS-driven seamless marquee for customers logos
// Duplicates items to exceed width and scrolls via requestAnimationFrame
(function(){
    function initMarquee(marquee){
        if (!marquee) return;
        const track = marquee.querySelector('.customers-track');
        if (!track) return;

        // Stop any CSS animation
        track.style.animation = 'none';
        track.style.transform = 'translate3d(0,0,0)';
        track.style.willChange = 'transform';
        track.style.display = 'flex';

        // Fixed spacing independent of CSS/media queries and flex-gap support
        const GAP_PX = 16;
        const gapPx = GAP_PX;

        // Flatten: move logo items out of .customers-seq wrappers into the track directly
        const wrappers = Array.from(track.querySelectorAll('.customers-seq'));
        if (wrappers.length) {
            const items = [];
            wrappers.forEach(w => { items.push(...Array.from(w.children)); });
            track.innerHTML = '';
            items.forEach(it => track.appendChild(it));
        }

        // Disable flex gap; use explicit margins for consistent spacing across browsers
        track.style.gap = '0px';

        function setFixedMargins(){
            Array.from(track.children).forEach(child => {
                child.style.flex = '0 0 auto';
                child.style.marginRight = gapPx + 'px';
            });
        }

        function recalcWrapperWidths(){
            Array.from(track.children).forEach(child => {
                const img = child.querySelector('img');
                if (!img) return;
                const rect = img.getBoundingClientRect();
                const width = Math.max(1, Math.round(rect.width));
                child.style.width = width + 'px';
                child.style.flex = '0 0 ' + width + 'px';
            });
            setFixedMargins();
        }

        function whenImagesReady(callback){
            const imgs = Array.from(track.querySelectorAll('img'));
            let remaining = imgs.length;
            if (remaining === 0) return callback();
            let done = false;
            function one(){ if (done) return; remaining -= 1; if (remaining <= 0) { done = true; callback(); } }
            imgs.forEach(img => {
                if (img.complete && img.naturalWidth) { one(); }
                else { img.addEventListener('load', one, { once: true }); img.addEventListener('error', one, { once: true }); }
            });
        }

        function duplicateUntilWideEnough(){
            const containerWidth = marquee.clientWidth;
            const originals = Array.from(track.children);
            if (!originals.length) return;
            let contentWidth = track.scrollWidth;
            while (contentWidth < containerWidth * 2 + 50) {
                originals.forEach(node => track.appendChild(node.cloneNode(true)));
                contentWidth = track.scrollWidth;
            }
        }

        function startScroll(){
            let offsetX = 0;
            const pixelsPerSecond = 40; // adjust for desired speed
            let lastTs = performance.now();

            function step(ts){
                const dt = (ts - lastTs) / 1000;
                lastTs = ts;
                offsetX -= pixelsPerSecond * dt;

                let first = track.firstElementChild;
                if (first){
                    let firstWidth = first.getBoundingClientRect().width;
                    const shiftThreshold = firstWidth + gapPx;
                    while (offsetX <= -shiftThreshold) {
                        track.appendChild(first);
                        offsetX += shiftThreshold;
                        first = track.firstElementChild;
                        if (!first) break;
                        firstWidth = first.getBoundingClientRect().width;
                    }
                }

                track.style.transform = 'translate3d(' + offsetX + 'px, 0, 0)';
                requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        }

        function setup(){
            recalcWrapperWidths();
            duplicateUntilWideEnough();
            startScroll();
        }

        whenImagesReady(() => {
            // recalc twice to ensure layout settled on mobiles
            recalcWrapperWidths();
            requestAnimationFrame(() => {
                recalcWrapperWidths();
                duplicateUntilWideEnough();
                startScroll();
            });
        });

        window.addEventListener('resize', () => {
            // Recalculate widths on resize to keep spacing consistent
            recalcWrapperWidths();
        });
    }

    if (document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', () => {
            const marquee = document.querySelector('.customers-marquee');
            initMarquee(marquee);
        });
    } else {
        const marquee = document.querySelector('.customers-marquee');
        initMarquee(marquee);
    }
})();


