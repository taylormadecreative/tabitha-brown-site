const tourList = document.querySelector('[data-tour-list]');
if (tourList) {
  fetch('/src/data/tour.json')
    .then(r => r.json())
    .then(dates => {
      const today = new Date();
      const upcoming = dates.filter(d => new Date(d.iso) >= today).slice(0, 4);
      const empty = upcoming.length === 0;

      if (empty) {
        tourList.innerHTML = '<li class="tour__row tour__row--empty"><span class="lede">More dates dropping soon, friend.</span></li>';
        return;
      }

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
    });
}
