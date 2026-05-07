// Highlight nav link for currently visible panel
const deck = document.querySelector('.deck');
const links = document.querySelectorAll('.topnav__link[data-panel]');
const panels = document.querySelectorAll('.panel');

if (deck && links.length && panels.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && e.intersectionRatio > 0.5) {
        const id = e.target.id;
        links.forEach(l => {
          if (l.dataset.panel === id) {
            l.setAttribute('aria-current', 'true');
          } else {
            l.removeAttribute('aria-current');
          }
        });
      }
    });
  }, { root: deck, threshold: [0.5] });

  panels.forEach(p => obs.observe(p));
}

// Newsletter form (single email, simulated success)
const form = document.querySelector('[data-newsletter-form]');
if (form) {
  const submit = form.querySelector('button[type="submit"]');
  const output = form.querySelector('output');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (data.get('website')) { output.textContent = "you're in."; return; }
    const email = data.get('email');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      output.textContent = "valid email, friend.";
      return;
    }
    submit.disabled = true;
    submit.textContent = 'Sending…';
    await new Promise(r => setTimeout(r, 700));
    submit.textContent = '✓';
    output.textContent = 'check your inbox.';
    if (navigator.vibrate) navigator.vibrate(10);
  });
}

// Keyboard navigation: arrow keys to scroll horizontally
if (deck) {
  document.addEventListener('keydown', (e) => {
    if (window.matchMedia('(max-width: 720px)').matches) return;
    if (e.key === 'ArrowRight') { deck.scrollBy({ left: window.innerWidth, behavior: 'smooth' }); }
    if (e.key === 'ArrowLeft')  { deck.scrollBy({ left: -window.innerWidth, behavior: 'smooth' }); }
  });
}
