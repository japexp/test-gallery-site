// Initialize AOS
if (window.AOS) {
    AOS.init({
        once: true,
        duration: 700,
        easing: 'ease-out-cubic'
    });
}

// Keep logo bar static; hide navbar upwards on scroll down, show on scroll up
(function () {
    const navbar = document.querySelector('.navbar');
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
        const currentY = window.scrollY;
        const goingDown = currentY > lastY;
        if (navbar) navbar.classList.toggle('nav-hidden', goingDown && currentY > 10);
        lastY = currentY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    // No JS hamburger — handled via CSS checkbox
})();

// Active nav link on scroll
(function () {
    const links = Array.from(document.querySelectorAll('.nav-link'));
    const sections = links.map(a => document.querySelector(a.getAttribute('href')));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const idx = sections.indexOf(entry.target);
            if (idx >= 0) {
                const link = links[idx];
                if (entry.isIntersecting) {
                    links.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });

    sections.forEach(sec => sec && observer.observe(sec));
})();


