const wordmark = document.querySelector('.footer__wordmark');
if (wordmark) {
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      wordmark.dataset.revealed = 'true';
      obs.disconnect();
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  obs.observe(wordmark);
}
