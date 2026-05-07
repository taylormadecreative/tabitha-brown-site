import Lenis from 'lenis';
import './nav.js';
import './hero.js';
import './about.js';
import './empire.js';
import './tour.js';
import './newsletter.js';
import './footer.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktop = window.matchMedia('(min-width: 1024px)').matches;

if (!reduced && desktop) {
  const lenis = new Lenis({
    duration: 2.0,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    wheelMultiplier: 0.85,
  });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
}
