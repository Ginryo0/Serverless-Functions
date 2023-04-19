const nameInput = document.querySelector('.name-input');
const emailInput = document.querySelector('.email-input');
const subjectInput = document.querySelector('.subject-input');
const messageInput = document.querySelector('.message-input');
const form = document.querySelector('.form');
const btn = document.querySelector('.submit-btn');
const alert = document.querySelector('.alert');
const title = document.querySelector('.title');
alert.style.display = 'none';

form.addEventListener('submit', async (e) => {
  console.log('1');
  e.preventDefault();
  alert.style.display = 'none';
  btn.disabled = true;
  btn.innerHTML = '<span class="sending"></span>';

  const name = nameInput.value;
  const email = emailInput.value;
  const subject = subjectInput.value;
  const msg = messageInput.value;

  try {
    await axios.post('/api/7-email', {
      name,
      email,
      subject,
      msg,
    });

    // clear inputs
    nameInput.value = '';
    emailInput.value = '';
    subjectInput.value = '';
    messageInput.value = '';
    title.textContent = 'Message Sent';
    title.insertAdjacentHTML(
      'afterend',
      '<h4 class="success">Check your mail for an email from <strong>ginryo16</strong></h4>'
    );

    setTimeout(() => {
      title.textContent = 'Send a Message';
      title.nextElementSibling.remove();
    }, 2000);
  } catch (error) {
    alert.style.display = 'block';
    alert.textContent = error.response.data;
  }
  btn.disabled = false;
  btn.innerHTML = 'Send';
});
