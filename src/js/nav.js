const nav = document.querySelector('[data-nav]');
const togglePanel = nav.querySelector('.nav__brands-toggle');
const panel = nav.querySelector('#brands-panel');
const brandGrid = nav.querySelector('[data-brand-grid]');
const mobileTrigger = nav.querySelector('.nav__mobile-trigger');
const mobileMenu = nav.querySelector('#mobile-menu');

let brands = [];

async function loadBrands() {
  const res = await fetch('/src/data/brands.json');
  brands = await res.json();
  renderBrandGrid();
}

function renderBrandGrid() {
  brandGrid.innerHTML = brands.map(b => `
    <li class="nav__brand-card" style="--tint:${b.tint}">
      <a href="${b.url}" target="_blank" rel="noopener noreferrer"
         data-brand-id="${b.id}">
        <span class="nav__brand-name">${b.name}</span>
        <span class="nav__brand-cat">${b.category}</span>
      </a>
    </li>
  `).join('');

  brandGrid.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseenter', () => {
      nav.style.setProperty('--nav-tint', a.parentElement.style.getPropertyValue('--tint'));
      nav.dataset.tinted = 'true';
    });
    a.addEventListener('mouseleave', () => {
      delete nav.dataset.tinted;
    });
  });
}

function openPanel() {
  panel.hidden = false;
  togglePanel.setAttribute('aria-expanded', 'true');
  document.addEventListener('keydown', onKey);
  document.addEventListener('click', onOutside);
}
function closePanel() {
  panel.hidden = true;
  togglePanel.setAttribute('aria-expanded', 'false');
  delete nav.dataset.tinted;
  document.removeEventListener('keydown', onKey);
  document.removeEventListener('click', onOutside);
}
function onKey(e) {
  if (e.key === 'Escape') { closePanel(); togglePanel.focus(); }
}
function onOutside(e) {
  if (!nav.contains(e.target)) closePanel();
}

togglePanel.addEventListener('click', (e) => {
  e.stopPropagation();
  panel.hidden ? openPanel() : closePanel();
});

// Sticky nav scroll state
const heroSentinel = document.querySelector('[data-hero]');
if (heroSentinel) {
  const obs = new IntersectionObserver(([entry]) => {
    nav.dataset.scrolled = !entry.isIntersecting;
  }, { rootMargin: '-80px 0px 0px 0px' });
  obs.observe(heroSentinel);
}

loadBrands();

export { brands };
