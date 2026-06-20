/* =============================================
1. PARTICLES
============================================= */
(function () {
    const c = document.getElementById('ptc');
    const colors = ['rgba(0,226,224,.5)', 'rgba(120,124,254,.5)', 'rgba(0,169,242,.45)', 'rgba(72,190,217,.4)', 'rgba(255,255,255,.55)'];
    for (let i = 0; i < 32; i++) {
        const p = document.createElement('div');
        p.className = 'pt';
        const sz = Math.random() * 5 + 2;
        p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}vw;bottom:-10px;background:${colors[Math.floor(Math.random() * colors.length)]};animation-duration:${Math.random() * 22 + 14}s;animation-delay:${Math.random() * 20}s;`;
        c.appendChild(p);
    }
})();

/* =============================================
2. SCROLL REVEAL
============================================= */
(function () {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
    }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('[data-r]').forEach(el => obs.observe(el));
})();

/* =============================================
    3. COUNTERS
    ============================================= */
(function () {
    function easeOut(t) { return 1 - Math.pow(1 - t, 4); }
    function run(el) {
        const target = +el.dataset.count;
        const sfx = el.dataset.sfx || '';
        const dur = 2000;
        const t0 = performance.now();
        (function tick(now) {
            const p = Math.min((now - t0) / dur, 1);
            el.textContent = Math.round(easeOut(p) * target).toLocaleString('en-Ar') + sfx;
            if (p < 1) requestAnimationFrame(tick);
        })(t0);
    }
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
    }, { threshold: .4 });
    document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
})();

/* =============================================
    4. INFINITE SCHOOL SLIDER
    ============================================= */
(function () {
    const schools = [
        { n: 'أكاديمية النور', a: 'NR', c: '#172D9D' },
        { n: 'مدرسة القادة', a: 'QD', c: '#787CFE' },
        { n: 'معهد الأفق', a: 'AF', c: '#00A9F2' },
        { n: 'مدرسة الفكر', a: 'FK', c: '#48BED9' },
        { n: 'أكاديمية المستقبل', a: 'MS', c: '#172D9D' },
        { n: 'مدرسة الرواد', a: 'RW', c: '#00E2E0' },
        { n: 'أكاديمية التميز', a: 'TM', c: '#787CFE' },
        { n: 'مدرسة الأزهر', a: 'AZ', c: '#00A9F2' },
        { n: 'معهد الشروق', a: 'SR', c: '#48BED9' },
        { n: 'مدرسة المعرفة', a: 'MR', c: '#172D9D' },
        { n: 'أكاديمية الإبداع', a: 'IB', c: '#787CFE' },
        { n: 'مدرسة الأمل', a: 'AM', c: '#00A9F2' },
    ];
    const track = document.getElementById('stk');
    if (!track) return;
    function chip(s) {
        const d = document.createElement('div');
        d.className = 'school-chip';
        d.innerHTML = `<div class="chip-logo" style="background:${s.c}18;color:${s.c};border:1px solid ${s.c}35">${s.a}</div><span class="chip-name">${s.n}</span>`;
        return d;
    }
    [...schools, ...schools].forEach(s => track.appendChild(chip(s)));
})();
