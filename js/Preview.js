document.addEventListener('click', (e) => {
    const btn = e.target.closest('.heart');
    if (!btn) return;
    const isOn = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', String(!isOn));
    btn.textContent = isOn ? '♡' : '❤';
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }
});

(() => {
    const container = document.querySelector('.date-card');
    if (!container) return;
    const dayButtons = Array.from(container.querySelectorAll('.day'));
    const navs = container.querySelectorAll('.date-card__nav .icon-btn.small');
    const prevBtn = navs && navs.length ? navs[0] : null;
    const nextBtn = navs && navs.length > 1 ? navs[1] : null;
    const bookBtn = container.querySelector('.date-card__cta');

    let activeIndex = Math.max(0, dayButtons.findIndex(b => b.classList.contains('active')));
    if (activeIndex === -1) activeIndex = 0;

    function labelFor(button) {
        const d = button.querySelector('.d')?.textContent?.trim() ?? '';
        const m = button.querySelector('.m')?.textContent?.trim() ?? '';
        return `${d} ${m}`.trim();
    }

    function setActive(index) {
        if (index < 0 || index >= dayButtons.length) return;
        dayButtons.forEach((b, i) => {
            b.classList.toggle('active', i === index);
            b.setAttribute('aria-pressed', String(i === index));
        });
        activeIndex = index;
    }

    function getNumbers() {
        return dayButtons.map(b => parseInt(b.querySelector('.d')?.textContent || '0', 10));
    }

    function setNumbers(nums) {
        nums.forEach((num, i) => {
            const dEl = dayButtons[i].querySelector('.d');
            if (dEl) dEl.textContent = String(num);
        });
        updateArrowDisabled();
    }

    function updateArrowDisabled() {
        const nums = getNumbers();
        const min = Math.min(...nums);
        const max = Math.max(...nums);
        if (prevBtn) prevBtn.disabled = min === 1;
        if (nextBtn) nextBtn.disabled = max === 30;
    }

    function shiftDates(delta) {
        const nums = getNumbers();
        const min = Math.min(...nums);
        const max = Math.max(...nums);
        if (delta > 0 && max >= 30) return; // can't go beyond 30
        if (delta < 0 && min <= 1) return;  // can't go below 1
        const shifted = nums.map(n => Math.max(1, Math.min(30, n + delta)));
        setNumbers(shifted);
    }

    dayButtons.forEach((btn, i) => {
        btn.addEventListener('click', () => setActive(i));
        btn.addEventListener('keydown', (ev) => {
            if (ev.key === 'ArrowRight') { ev.preventDefault(); setActive(Math.min(dayButtons.length - 1, activeIndex + 1)); dayButtons[activeIndex].focus(); }
            if (ev.key === 'ArrowLeft') { ev.preventDefault(); setActive(Math.max(0, activeIndex - 1)); dayButtons[activeIndex].focus(); }
        });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => shiftDates(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => shiftDates(1));

    if (bookBtn) bookBtn.addEventListener('click', () => {
        const chosen = dayButtons[activeIndex] ? labelFor(dayButtons[activeIndex]) : '';
        alert(`Booking for ${chosen}`);
    });

    dayButtons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === activeIndex)));
    updateArrowDisabled();
})();