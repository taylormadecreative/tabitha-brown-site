const form = document.querySelector('[data-newsletter-form]');
if (form) {
  const tabs = form.querySelectorAll('.newsletter__tab');
  const emailField = form.querySelector('[data-field="email"]');
  const smsField = form.querySelector('[data-field="sms"]');
  const submit = form.querySelector('.newsletter__submit');
  const labelSpan = submit.querySelector('.newsletter__submit-label');
  const loadSpan = submit.querySelector('.newsletter__submit-loading');
  const successSpan = submit.querySelector('.newsletter__submit-success');
  const output = form.querySelector('[data-newsletter-output]');

  let mode = 'email';

  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(x => x.setAttribute('aria-selected', String(x === t)));
      mode = t.dataset.tab;
      emailField.hidden = mode !== 'email';
      smsField.hidden = mode !== 'sms';
      const input = (mode === 'email' ? emailField : smsField).querySelector('input');
      input.required = true;
      const other = (mode === 'email' ? smsField : emailField).querySelector('input');
      other.required = false;
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    if (data.get('website')) {
      output.textContent = "You're subscribed.";
      return;
    }

    if (mode === 'email') {
      const email = data.get('email');
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        output.textContent = "Please enter a valid email, friend.";
        return;
      }
    }

    setState('loading');

    try {
      // Simulated success — replace with ConvertKit / Klaviyo when wired
      await new Promise(r => setTimeout(r, 800));

      setState('success');
      output.innerHTML = `
        <span class="script newsletter__welcome">"Welcome, friend."</span>
        <span class="lede newsletter__pie">Check your inbox. There's pie.</span>
      `;
      output.dataset.success = 'true';

      if (navigator.vibrate) navigator.vibrate(10);
    } catch (err) {
      setState('error');
      output.innerHTML = `Hmm, something didn't send. <button type="button" class="link-underline" data-retry>Try again</button>`;
      output.querySelector('[data-retry]')?.addEventListener('click', () => form.requestSubmit());
    }
  });

  function setState(state) {
    submit.dataset.state = state;
    labelSpan.hidden = state !== 'idle';
    loadSpan.hidden = state !== 'loading';
    successSpan.hidden = state !== 'success';
    submit.disabled = state === 'loading' || state === 'success';
  }
}
