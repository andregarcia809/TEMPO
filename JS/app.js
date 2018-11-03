// Set up
class AjaxWeather {
  constructor() {
    this.apiKey = 'c338a7319efb7cd8f389ecb4b62ccadb';
  }

  // Gets weather info
  async getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=imperial`;
    const wheatherData = await fetch(url);
    const weather = await wheatherData.json();
    return weather
  }
}

// class// shows weather info on webpage
class Display {
  constructor() {
    this.currentcity = document.querySelector('.current__city');
    this.currentCondition = document.querySelector('.current__weather__condition');
    this.currentTemp = document.querySelector('.current__temp__label');
  }
  showWeather(data) {
    console.log(data);
    const {
      name,
      main: {
        temp
      }
    } = data;
    const {
      description
    } = data.weather[0];

    this.currentcity.textContent = name;
    this.currentCondition.textContent = description;
    this.currentTemp.textContent = temp;
  };
}


const cityInput = document.querySelector('#city__input');
const searchBtn = document.querySelector('#search__btn');

// class insatances
const ajax = new AjaxWeather();
const display = new Display();


// Validation
searchBtn.addEventListener('click', event => {
  event.preventDefault();
  const city = cityInput.value;

  if (city.length === 0) {
    showFeedback('City value cannot be empty');
  } else {
    ajax.getWeather(city).then(data => {
      if (data.cod === '404') {
        showFeedback('This city is not found')
      } else {
        display.showWeather(data)
      }
    });
  }
});

function showFeedback(err) {
  const error = document.querySelector('.error');

  error.innerHTML = `${err}`;

  setTimeout(() => {
    error.style.display = 'none';
  }, 3000)
};