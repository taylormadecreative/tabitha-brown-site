const hero = document.querySelector('[data-hero]');
const heroImage = hero?.querySelector('.hero__image');
const heroContent = hero?.querySelector('.hero__content');
if (!hero || !heroImage) {} else {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        // Two-layer parallax: image scales + falls slightly; type rises and fades
        heroImage.style.transform = `translateY(${progress * 80}px) scale(${1 + progress * 0.15})`;
        if (heroContent) {
          heroContent.style.transform = `translateY(${progress * -60}px)`;
          heroContent.style.opacity = String(Math.max(0, 1 - progress * 1.2));
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}
