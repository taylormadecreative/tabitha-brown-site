import dates from '../data/tour.json';

const tourList = document.querySelector('[data-tour-list]');
const ticker = document.querySelector('[data-ticker] strong');

const today = new Date();
const upcoming = dates.filter(d => new Date(d.iso) >= today).slice(0, 4);

// Populate the nav ticker with the next upcoming city (if any)
if (ticker) {
  if (upcoming.length > 0) {
    ticker.textContent = upcoming[0].city;
  } else {
    ticker.textContent = 'in studio';
  }
}

if (tourList) {
  if (upcoming.length === 0) {
    tourList.innerHTML = '<li class="tour__row tour__row--empty"><span class="lede">More dates dropping soon, friend.</span></li>';
  } else {
    tourList.innerHTML = upcoming.map(d => `
      <li class="tour__row">
        <span class="tour__date mono-detail">${d.date}</span>
        <span class="tour__city">${d.city}</span>
        <span class="tour__event">${d.event}</span>
        <a class="tour__cta link-underline" href="${d.url}" target="_blank" rel="noopener noreferrer">
          Get Tickets <span aria-hidden="true">↗</span>
        </a>
      </li>
    `).join('');
  }
}
