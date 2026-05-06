const hero = document.querySelector('[data-hero]');
const heroImage = hero?.querySelector('.hero__image img');
if (!heroImage) throw new Error('Hero image not found');

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  let raf;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      const scale = 1 + progress * 0.15;
      heroImage.style.transform = `scale(${scale})`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
