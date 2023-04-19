const form = document.querySelector('.form');
const emailInput = document.querySelector('.email-input');
const alert = document.querySelector('.alert');
alert.style.display = 'none';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  form.classList.add('loading');
  alert.style.display = 'none';
  const email = emailInput.value;
  const formData = new FormData();
  try {
    await axios.post('/api/6-newsletter', { email });
    form.innerHTML =
      '<h4 class="success">Thanks for subscribing!</h4> <h5 class="sub-success">Please check your inbox for confirmation email to join our Potata newsletter. </h5>';
  } catch (err) {
    console.log(err.response);
    alert.style.display = 'block';
    alert.textContent = 'Something went wrong! Please try again later.';
  }
  form.classList.remove('loading');
});
