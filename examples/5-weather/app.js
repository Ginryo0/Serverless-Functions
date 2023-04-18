// it takes few minutes

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const alert = document.querySelector('.alert');
const result = document.querySelector('.result');
alert.style.display = 'none';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = input.value;
  if (city) {
    getWeather(city);
  }
});

const getWeather = async (city) => {
  alert.style.display = 'none';
  try {
    const { data } = await axios.post('/api/5-weather', { city });
    const { name, sys, main, weather } = data;
    const { country } = sys;
    const { temp_max: max, temp_min: min, feels_like } = main;
    const { description } = weather[0];
    result.innerHTML = `
    <article class="card">
    <h3>${name},${country}</h3>
    <p>${description}</p>
    <p>min temp : ${fToC(min)}&#8451</p>
    <p>min temp : ${fToC(max)}&#8451</p>
    <p>feels like : ${fToC(feels_like)}&#8451</p>
    </article>
    `;
  } catch (error) {
    // console.log(error); ->
    alert.style.display = 'block';
    alert.textContent = `Can not find weather data for city : "${city}"`;
  }
};

const fToC = (t) => {
  return (((t - 32) * 5) / 9).toFixed(2);
};
