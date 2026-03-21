document.addEventListener("DOMContentLoaded", () => {
    const statsItems = document.querySelectorAll(".abt-stats-item h1");

    const animateCounter = (el) => {
        const target = parseFloat(el.innerText.replace('%', ''));
        const isPercentage = el.innerText.includes('%');
        const duration = 700;
        const frameRate = 1000 / 120;
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;

        const update = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;

            const easeProgress = 1 - Math.pow(2, -10 * progress);
            const currentVal = Math.round(target * easeProgress);

            el.innerText = isPercentage ? `${currentVal}%` : currentVal;

            if (currentFrame < totalFrames) {
                requestAnimationFrame(update);
            } else {
                el.innerText = isPercentage ? `${target}%` : target;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});

    statsItems.forEach(item => observer.observe(item));
});
