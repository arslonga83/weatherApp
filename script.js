const code = '495619d270c09909b5c5a53a12eb4121';
const input = document.querySelector('input');
const button = document.querySelector('button');
const body = document.querySelector('body');

button.addEventListener('click', () => {
  let location = input.value.split(', ');
  getGeoLocation(location[0], location[1]);
  input.value = '';
})

const getGeoLocation = async function (city, state) {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},{country code}&limit=1&appid=${code}`);
  const data = await response.json();
  getWeather(data[0].lat, data[0].lon);
}

const getWeather = async function (lat, lon) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${code}&units=imperial`)
  const weather = await response.json();
  printForecast(weather.name, weather.main.temp, weather.weather[0].description);
  displayBackground(weather.weather[0].main);
  console.log(weather);
  console.log(`${weather.main.temp} deg F`);
  console.log(weather.weather[0].description)
}

const forecast = document.getElementById('forecast');
const printForecast = (city, temp, description) => {
  forecast.innerHTML = '';
  const h1 = forecast.appendChild(document.createElement('h1'));
  h1.textContent = city;
  const h2 = forecast.appendChild(document.createElement('h2'));
  h2.textContent = `${temp}°F`;
  const desc = forecast.appendChild(document.createElement('h2'));
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





getGeoLocation('portland', 'or');

