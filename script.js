const code = '495619d270c09909b5c5a53a12eb4121';
const input = document.querySelector('input');
const button = document.querySelector('button');
const body = document.querySelector('body');
const h1 = document.getElementById('line1');
const h2 = document.getElementById('line2');
const desc = document.getElementById('line3');

button.addEventListener('click', () => {
  let location = input.value.split(', ');
  getGeoLocation(location[0], location[1]);
  input.value = '';
})

const getGeoLocation = async function (city, state) {
  try {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},{country code}&limit=1&appid=${code}`);
  const data = await response.json();
  getWeather(data[0].lat, data[0].lon);
  } catch (err) {
    printForecast('Oops...', '', 'something went wrong...')
  }
}

const getWeather = async function (lat, lon) {
  try {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${code}&units=imperial`)
  const weather = await response.json();
  printForecast(weather.name, weather.main.temp, weather.weather[0].description);
  displayBackground(weather.weather[0].main);
  console.log(weather);
  } catch (err) {
    printForecast('Oops', '', 'something went wrong...')
  }
}

const forecast = document.getElementById('forecast');
const printForecast = (city, temp, description) => {
  h1.textContent = city;
  h2.textContent = `${temp}°F`;
  desc.textContent = description;
}


const displayBackground = (weather) => {
  if (weather === 'Clear') {
    body.style.background = 'url(./clear.jpg) no-repeat center center fixed';
  }
  if (weather === 'Snow') {
    body.style.background = 'url(./snow.jpg) no-repeat center center fixed';
  }
  if (weather === 'Rain' || weather === 'Drizzle') {
    body.style.background = 'url(./rain.jpg) no-repeat center center fixed';
  }
  if (weather === 'Clouds') {
    body.style.background = 'url(./clouds.jpg) no-repeat center center fixed';
  }
  body.style.backgroundSize = 'cover';
}

//call local weather on page load
getGeoLocation('portland', 'or');

