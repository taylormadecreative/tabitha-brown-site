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
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1.0,
  });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
}
