        /* PARTICLES */
        (function () {
            const c = document.getElementById('ptc');
            const cls = ['rgba(0,226,224,.5)', 'rgba(120,124,254,.45)', 'rgba(0,169,242,.4)', 'rgba(72,190,217,.4)', 'rgba(255,255,255,.6)'];
            for (let i = 0; i < 30; i++) {
                const p = document.createElement('div');
                p.className = 'pt';
                const sz = Math.random() * 5 + 2;
                p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}vw;bottom:-8px;background:${cls[Math.floor(Math.random() * cls.length)]};animation-duration:${Math.random() * 22 + 12}s;animation-delay:${Math.random() * 20}s;`;
                c.appendChild(p);
            }
        })();

        /* SCROLL REVEAL */
        (function () {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
                });
            }, { threshold: .1, rootMargin: '0px 0px -30px 0px' });
            document.querySelectorAll('[data-r]').forEach(el => obs.observe(el));
            // Also mark child elements of achievement grid
            document.querySelectorAll('[data-d]').forEach(el => {
                el.setAttribute('data-r', 'up');
                obs.observe(el);
            });
        })();

        /* COUNTERS */
        (function () {
            function easeOut(t) { return 1 - Math.pow(1 - t, 4); }
            function run(el) {
                const target = +el.dataset.count;
                const sfx = el.dataset.sfx || '';
                const dur = 2000; const t0 = performance.now();
                (function tick(now) {
                    const prog = Math.min((now - t0) / dur, 1);
                    el.textContent = Math.round(easeOut(prog) * target).toLocaleString('ar-EG') + sfx;
                    if (prog < 1) requestAnimationFrame(tick);
                })(t0);
            }
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
            }, { threshold: .4 });
            document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
        })();

        /* PROGRESS BARS animate on scroll */
        (function () {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        const fills = e.target.querySelectorAll('.prog-fill');
                        fills.forEach(f => { const w = f.style.width; f.style.width = '0'; setTimeout(() => { f.style.width = w; }, 100); });
                        obs.unobserve(e.target);
                    }
                });
            }, { threshold: .3 });
            document.querySelectorAll('.gc').forEach(el => obs.observe(el));
        })();

        /* MOBILE SIDEBAR */
        (function () {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sOverlay');
            const toggle = document.getElementById('mobToggle');
            function open() { sidebar.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
            function close() { sidebar.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }
            toggle.addEventListener('click', () => sidebar.classList.contains('open') ? close() : open());
            overlay.addEventListener('click', close);
            sidebar.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', () => {
                    sidebar.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    if (window.innerWidth < 992) close();
                });
            });
        })();
