const form = document.querySelector('[data-newsletter-form]');
if (form) {
  const submit = form.querySelector('.newsletter__submit');
  const labelSpan = submit.querySelector('.newsletter__submit-label');
  const output = form.querySelector('[data-newsletter-output]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    if (data.get('website')) {
      output.textContent = "you're in.";
      return;
    }

    const email = data.get('email');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      output.textContent = "valid email, friend.";
      return;
    }

    submit.disabled = true;
    submit.dataset.state = 'loading';
    if (labelSpan) labelSpan.textContent = 'Sending…';

    try {
      // Replace with ConvertKit / Klaviyo when wired
      await new Promise(r => setTimeout(r, 800));

      submit.dataset.state = 'success';
      if (labelSpan) labelSpan.textContent = '✓';
      output.textContent = "check your inbox.";

      if (navigator.vibrate) navigator.vibrate(10);
    } catch (err) {
      submit.dataset.state = 'error';
      submit.disabled = false;
      if (labelSpan) labelSpan.textContent = 'Send →';
      output.textContent = "didn't send. try again.";
    }
  });
}
