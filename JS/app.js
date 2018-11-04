// Set up
class AjaxWeather {
  constructor() {
    this.apiKey = 'c338a7319efb7cd8f389ecb4b62ccadb';
  }

  // Gets current weather info
  async getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=imperial`;
    const wheatherData = await fetch(url);
    const weather = await wheatherData.json();
    return weather
  }

  // Gets 2 days forecast info
  async getForecast(city) {
    const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=imperial`;
    const forecastData = await fetch(url1);
    const forecast = await forecastData.json();
    return forecast
  }
}

// class// shows weather info on webpage
class Display {
  constructor() {
    // Current Panel Elements
    this.currentForecastPanel = document.querySelector('.current__forecast');
    this.currentCity = document.querySelector('.city');
    this.currentCondition = document.querySelector('.current__weather__condition');
    this.currentTemp = document.querySelector('.current__temp__label');
    this.currentWind = document.querySelector('#current__wind');
    this.currentHumidity = document.querySelector('#current__humidity');
    this.currentSunSnow = document.querySelector('.current__sun__snow__icon');
    this.currentIcon = document.querySelector('.current__icon');
    this.currentIcon2 = document.querySelector('.current__icon2');


    // Tonight Panel Elements
    this.tonightForecastPanel = document.querySelector('.tonight__forecast')
    this.tonightCity = document.querySelector('.tonight__city');
    this.tonightCondition = document.querySelector('.tonight__weather__condition');
    this.tonighttWind = document.querySelector('#tonight__wind');
    this.tonightHumidity = document.querySelector('#tonight__humidity');
    this.tonightTemp = document.querySelector('.tonight__temp__label');
    this.tonightIcon = document.querySelector('.tonight__icon');
    this.tonightIcon2 = document.querySelector('.tonight__icon2');

    // Tomorrow Panel Elements
    this.tomorrowForecastPanel = document.querySelector('.tomorrow__forecast');
    this.tomorrowCity = document.querySelector('.tomorrow__city');
    this.tomorrowCondition = document.querySelector('.tomorrow__weather__condition');
    this.tomorrowWind = document.querySelector('#tomorrow__wind');
    this.tomorrowHumidity = document.querySelector('#tomorrow__humidity');
    this.tomorrowTemp = document.querySelector('.tomorrow__temp__label');
    this.tomorrowSunSnowIcon = document.querySelector('.tomorrow__sun__snow__icon');
    this.tomorrowIcon = document.querySelector('.tomorrow__icon');
    this.tomorrowIcon2 = document.querySelector('.tomorrow__icon2');
  }
  showWeather(data) {
    // Current weather details
    console.log(data);
    const {
      name
    } = data;
    const {
      description
    } = data.weather[0];
    const temp = Math.floor(data.main.temp);
    const wind = 'WIND: ' + Math.floor(data.wind.speed) + ' mph';
    const humidity = ' HUMIDITY: ' + data.main.humidity + '%';

    this.currentCity.textContent = name;
    this.currentCondition.textContent = description;
    this.currentWind.textContent = wind;
    this.currentHumidity.textContent = humidity;
    this.currentTemp.textContent = temp;
  };

  showForecast(data) {
    // Tonight weather details
    console.log(data);
    const {
      city: {
        name
      }
    } = data;
    const temp = Math.floor(data.list[1].main.temp);
    const {
      description
    } = data.list[1].weather[0];
    const wind = 'WIND: ' + Math.floor(data.list[1].wind.speed) + ' mph';
    const humidity = ' HUMIDITY: ' + data.list[1].main.humidity + '%';

    this.tonightCity.textContent = name;
    this.tonightCondition.textContent = description;
    this.tonighttWind.textContent = wind;
    this.tonightHumidity.textContent = humidity;
    this.tonightTemp.textContent = temp;

    // Tomorrow weather details
    const tomorrowCityName = data.city.name;
    const tomorrowConditionDescription = data.list[4].weather[0].description;
    const tomorrowWind = 'WIND: ' + Math.floor(data.list[4].wind.speed) + ' mph';
    const tomorrowHumidity = ' HUMIDITY: ' + data.list[4].main.humidity + '%';
    const tomorrowTemperature = Math.floor(data.list[4].main.temp);

    this.tomorrowCity.textContent = tomorrowCityName;
    this.tomorrowCondition.textContent = tomorrowConditionDescription;
    this.tomorrowWind.textContent = tomorrowWind;
    this.tomorrowHumidity.textContent = tomorrowHumidity;
    this.tomorrowTemp.textContent = tomorrowTemperature;
  };

  changeBackground(data) {
    const currentCondition = data.weather[0].description;

    // Current Weather
    if (currentCondition.includes('clouds', 'cloudy')) {

      // Changes background images
      this.currentForecastPanel.style.backgroundImage ='url(img/cloudy.jpg)';
      this.currentIcon.classList.add('cloud');
      this.currentIcon2.classList.add('cloud');

    } else if (currentCondition.includes('rain')) {
      this.currentIcon.classList.add('cloud');
      this.currentIcon2.classList.add('rain');

    } else if (currentCondition.includes('snow', 'flurry', 'flake')) {
      this.currentForecastPanel.style.backgroundImage = 'url(img/cloudy.jpg)';
      this.currentSunSnowIcon.classList.add(snow);
      this.currentIcon.classList.add('flake');
      this.currentIcon2.classList.add('flake');

    } else if (currentCondition.includes('sunny', 'sun')) {
      this.currentForecastPanel.style.backgroundImage = 'url(img/sunny.jpg)';
      this.currentSunSnow.classList.add('sunny');
      this.currentIcon.classList.add('sun');

    } else if (currentCondition.includes('clear')) {
      this.currentForecastPanel.style.backgroundImage = 'url(img/sunny.jpg)';
    }
  };
  addAnimationBackground(data) {
    const tonightDescription = data.list[1].weather[0].description;
    const tomorrowConditionDescription = data.list[4].weather[0].description;

    // Tonights Weather
    if (tonightDescription.includes('clouds', 'cloudy')) {
      this.tonightIcon.classList.add('cloud');
      this.tonightIcon2.classList.add('cloud');

    } else if (tonightDescription.includes('rain')) {
      this.tonightIcon.classList.add('cloud');
      this.tonightIcon2.classList.remove('cloud');
      this.tonightIcon2.classList.add('rain');
    };

    // Tomorrow's Weather
    if (tomorrowConditionDescription.includes('clouds', 'cloudy')) {
      this.tomorrowForecastPanel.style.backgroundImage =
      'url(img/cloudy.jpg)';
      this.tomorrowIcon.classList.add('cloud');
      this.tomorrowIcon2.classList.add('cloud');

    } else if (tomorrowConditionDescription.includes('rain')) {
      this.tomorrowForecastPanel.style.backgroundImage =
      'url(img/cloudy.jpg)';
      this.tomorrowIcon.classList.add('cloud');
      this.tomorrowIcon2.classList.remove('cloud');
      this.tomorrowIcon2.classList.add('rain');

    } else if (tomorrowConditionDescription.includes('snow', 'flurry', 'flake')) {
      this.tomorrowForecastPanel.style.backgroundImage =
      'url(img/cloudy.jpg)';
      this.tomorrowSunSnowIcon.classList.add(snow);
      this.tomorrowIcon.classList.remove('cloud');
      this.tomorrowIcon.classList.remove('sun');
      this.tomorrowIcon2.classList.remove('rain');
      this.tomorrowIcon2.classList.remove('cloud');
      this.tomorrowIcon.classList.add('flake');
      this.tomorrowIcon2.classList.add('flake');

    } else if (tomorrowCondition.includes('sunny', 'sun')) {
      this.tomorrowForecastPanel.style.backgroundImage = 'url(img/sunny.jpg)';
      this.tomorrowSunSnowIcon.classList.add('sunny');
      this.tomorrowIcon.classList.remove('cloud');
      this.tomorrowIcon.classList.remove('flake');
      this.tomorrowIcon2.classList.remove('rain');
      this.tomorrowIcon2.classList.remove('cloud');
      this.tomorrowIcon.classList.add('sun');

    } else if (tomorrowCondition.includes('clear')) {
      this.tomorrowForecastPanel.style.backgroundImage = 'url(img/sunny.jpg)';
    }
  }
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
        display.changeBackground(data);
      }
    });
  }

  ajax.getForecast(city).then(data => {
    display.showForecast(data);
    display.addAnimationBackground(data);
  });

});

// Displays error
function showFeedback(err) {
  const error = document.querySelector('.error');

  error.innerHTML = `${err}`;

  setTimeout(() => {
    error.style.display = 'none';
  }, 3000)
};

// function temperatureConverter() {
//   const currentfahrenheit = document.querySelector('#current__fahrenheit');
//   const currentcelsius = document.querySelector('#current__celsius');

//   currentfahrenheit.addEventListener('click', () => {
//     this.currentTemp.textContent = temp;
//     console.log('clicked')
//   })

// }  Still working on it