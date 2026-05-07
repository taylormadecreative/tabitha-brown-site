import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { brands } from './nav.js';
import brandsData from '../data/brands.json';

gsap.registerPlugin(ScrollTrigger);

// Eagerly bundle every empire-photo variant. Vite resolves the static glob at
// build time and emits hashed asset URLs; runtime concatenation does not.
const empireImgs = import.meta.glob('../assets/img/*.jpg', {
  eager: true,
  import: 'default',
  query: '?url',
});

function resolveImg(slug, w) {
  return empireImgs[`../assets/img/${slug}-${w}.jpg`];
}

// Object photo slug overrides — these images exist in /src/assets/img/
// (brands.json's `object` values are placeholders for hand-shot signature objects)
// `w` is the largest available width on disk for each substitute slug.
const OBJECT_OVERRIDE = {
  'donnas-recipe':       { slug: 'chance-and-tabitha-applying-oil-to-wife',          w: 1280 },
  'tabitha-for-target':  { slug: 'tab-today7400283-12',                                w: 1280 },
  'mclovins':            { slug: 'dsc03543',                                           w: 1280 },
  'cookbooks':           { slug: 'tabitha-with-sweet-potato-pie-collection-with-pie-in-hand', w: 1280 },
  'tab-time':            { slug: 'dsc02078',                                           w: 1280 },
  'lil-tab-time':        { slug: 'c9803-00-20-01-08-still008',                         w: 640  },
  'tab-time-podcast':    { slug: 'c9803-00-20-06-14-still005',                         w: 640  },
  'acting':              { slug: 'c9803-00-21-44-08-still006',                         w: 640  },
  'speaking':            { slug: 'dsc02789',                                           w: 1280 },
};

function imgSrc(b) {
  const o = OBJECT_OVERRIDE[b.id];
  if (o) return resolveImg(o.slug, o.w);
  return resolveImg(b.object, 1280);
}

async function renderChapters() {
  // brands.json may not be loaded yet — wait briefly for nav.js to populate
  await new Promise(r => setTimeout(r, 50));
  if (!brands.length) {
    brands.push(...brandsData);
  }

  const chaptersEl = document.querySelector('[data-empire-chapters]');
  const stageEl = document.querySelector('[data-empire-stage]');

  if (!chaptersEl || !stageEl) return;

  chaptersEl.innerHTML = brands.map((b, i) => `
    <li class="chapter" data-chapter="${i}" style="--tint:${b.tint}">
      <article class="chapter__card container">
        <h3 class="chapter__name display-xl">${b.name}</h3>
        <a class="chapter__cta" href="${b.url}" target="_blank" rel="noopener noreferrer">
          Enter <span aria-hidden="true">→</span>
        </a>
      </article>
      <picture class="chapter__photo-mobile">
        <img src="${imgSrc(b)}" alt="${b.name}" loading="lazy" width="1280" height="1280" />
      </picture>
    </li>
  `).join('');

  stageEl.innerHTML = brands.map((b, i) => `
    <picture class="stage-frame" data-frame="${i}" ${i===0 ? 'data-active="true"' : ''}>
      <img src="${imgSrc(b)}" alt="" loading="${i<2?'eager':'lazy'}" width="1280" height="1707" />
    </picture>
  `).join('');
}

renderChapters();

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

if (!reduced && isDesktop) {
  // Wait for chapters to be rendered
  setTimeout(() => {
    const chapters = document.querySelectorAll('.chapter');
    const frames = document.querySelectorAll('.stage-frame');
    const empire = document.querySelector('.empire');

    chapters.forEach((chapter, i) => {
      ScrollTrigger.create({
        trigger: chapter,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => activate(i),
        onEnterBack: () => activate(i),
      });
    });

    function activate(i) {
      frames.forEach(f => delete f.dataset.active);
      if (frames[i]) frames[i].dataset.active = 'true';
      const tint = chapters[i].style.getPropertyValue('--tint');
      empire.style.background = `color-mix(in oklab, var(--cream), ${tint} 8%)`;
    }
  }, 200);
}
