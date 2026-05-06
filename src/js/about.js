const portrait = document.querySelector('.about__portrait');
if (portrait) {
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      portrait.dataset.loaded = 'true';
      obs.disconnect();
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  obs.observe(portrait);
}
