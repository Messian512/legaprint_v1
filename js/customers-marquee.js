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

        // Collect gap from existing sequence wrapper if present
        const seq = track.querySelector('.customers-seq');
        let gapPx = 24;
        if (seq) {
            const cs = window.getComputedStyle(seq);
            const gap = cs.gap || cs.columnGap || cs.rowGap;
            if (gap && /px$/.test(gap)) {
                gapPx = parseFloat(gap);
            }
        }

        // Flatten: move logo items out of .customers-seq wrappers into the track directly
        const wrappers = Array.from(track.querySelectorAll('.customers-seq'));
        if (wrappers.length) {
            const items = [];
            wrappers.forEach(w => {
                items.push(...Array.from(w.children));
            });
            track.innerHTML = '';
            items.forEach(it => track.appendChild(it));
        }

        // Ensure consistent spacing using flex gap on track
        track.style.gap = gapPx + 'px';

        // Ensure each logo wrapper is not flexible
        Array.from(track.children).forEach(child => {
            child.style.flex = '0 0 auto';
        });

        // Duplicate children until content width >= 2x container width for smooth loop
        const containerWidth = marquee.clientWidth;
        function measureContentWidth(){
            return track.scrollWidth;
        }
        const originals = Array.from(track.children);
        let contentWidth = measureContentWidth();
        // Safety: if no items, abort
        if (!originals.length) return;
        while (contentWidth < containerWidth * 2 + 227) {
            originals.forEach(node => track.appendChild(node.cloneNode(true)));
            contentWidth = measureContentWidth();
        }

        // Scroll logic
        let offsetX = 0;
        const pixelsPerSecond = 40; // adjust for desired speed
        let lastTs = performance.now();

        function step(ts){
            const dt = (ts - lastTs) / 1000;
            lastTs = ts;
            offsetX -= pixelsPerSecond * dt;

            // When the first item fully moved out (including gap), move it to the end and adjust offset
            let first = track.firstElementChild;
            if (first){
                // Use bounding box to include any borders/padding
                let firstWidth = first.getBoundingClientRect().width;
                const shiftThreshold = firstWidth + gapPx;
                // Move multiple items if needed (on slow machines / tab switch)
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

        // Pause on hover for better UX
        let paused = false;
        marquee.addEventListener('mouseenter', () => { paused = true; });
        marquee.addEventListener('mouseleave', () => { paused = false; lastTs = performance.now(); });
        // If paused, freeze offset but continue RAF to keep timing consistent
        const origStep = step;
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


