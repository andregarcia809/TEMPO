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

    // Needs to be called on load getLocation()
    getLocation();
    // Current Panel Elements
    this.containerEl = document.querySelector('.container');
    this.forecastPanelBody = document.querySelector('.forecast__panel__body');
    this.currentForecastPanel = document.querySelector('.current__forecast');
    this.currentCity = document.querySelector('.city');
    this.currentCondition = document.querySelector('.current__weather__condition');
    this.currentTemp = document.querySelector('.current__temp__label');
    this.currentWind = document.querySelector('#current__wind');
    this.currentHumidity = document.querySelector('#current__humidity');
    this.currentSunSnowIcon = document.querySelector('.current__sun__snow__icon');
    this.currentIcon = document.querySelector('.current__icon');
    this.currentIcon2 = document.querySelector('.current__icon2');
    this.error = document.querySelector('.error');


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

    // Gets user's location
    function getLocation() {
      if (navigator.geolocation) {
        // Gets user's Weather
        window.onload = () => {
          navigator.geolocation.getCurrentPosition(showPosition);

          function showPosition(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude

            const apiKey = 'c338a7319efb7cd8f389ecb4b62ccadb';
            const Url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}0&lon=${lon}&appid=${apiKey}&units=imperial`;

            fetch(Url)
              .then(data => {
                return data.json()
              })

              // Outputs users weather to current panel
              .then(res => {
                const data = res;
                const name = data.name;
                const description = data.weather[0].description;
                const temp = Math.floor(data.main.temp);
                const wind = 'WIND: ' + Math.floor(data.wind.speed) + ' mph';
                const humidity = ' HUMIDITY: ' + data.main.humidity + '%';

                display.currentCity.textContent = name;
                display.currentCondition.textContent = description;
                display.currentWind.textContent = wind;
                display.currentHumidity.textContent = humidity;
                display.currentTemp.textContent = temp;

                // Current Weather
                if (display.currentCondition == 'clouds' || 'cloudy') {
                  display.currentForecastPanel.style.backgroundImage = 'url(img/cloudy.jpg)';
                  display.currentIcon.classList.add('cloud');
                  display.currentIcon2.classList.add('cloud');

                } else if (display.currentCondition == 'rain') {
                  display.currentIcon.classList.add('cloud');
                  display.currentIcon2.classList.add('rain');

                } else if (display.currentCondition == 'snow' || 'flurry' || 'flake') {
                  display.currentForecastPanel.style.backgroundImage = 'url(img/cloudy.jpg)';
                  display.currentSunSnowIcon.classList.add(snow);
                  display.currentIcon.classList.add('flake');
                  display.currentIcon2.classList.add('flake');

                } else if (display.currentCondition == 'sunny' || 'sun') {
                  display.currentForecastPanel.style.backgroundImage = 'url(img/sunny.jpg)';
                  display.currentSunSnow.classList.add('sunny');
                  display.currentIcon.classList.add('sun');

                } else if (display.currentCondition == 'clear') {
                  this.currentForecastPanel.style.backgroundImage = 'url(img/sunny.jpg)';
                }

              })

          }
        }


      }

    }


  }

  showWeather(data) {
    // Current weather details
    const {
      name
    } = data;
    const {
      description
    } = data.weather[0];
    const temp = Math.floor(data.main.temp);
    const wind = 'WIND: ' + Math.floor(data.wind.speed) + ' mph';
    const humidity = ' HUMIDITY: ' + data.main.humidity + '%';

    display.currentCity.textContent = name;
    this.currentCondition.textContent = description;
    this.currentWind.textContent = wind;
    this.currentHumidity.textContent = humidity;
    this.currentTemp.textContent = temp;
  };

  showForecast(data) {
    // Tonight weather details
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

  showWeatherPanels() {
    if (true) {
      this.containerEl.style.width = '80%';
      this.currentForecastPanel.style.width = "100%";
      this.currentForecastPanel.style.margin = "0";
      this.forecastPanelBody.style.display = 'grid';
      this.tonightForecastPanel.style.display = 'block';
      this.tomorrowForecastPanel.style.display = 'block'
    }
  }

  addAnimationBackgroundCurrent(data) {
    console.log(data)
    // Current Weather
    const currentCondition = data.weather[0].description;

    if (currentCondition.includes('clouds', 'cloudy')) {
      this.currentSunSnowIcon.classList.remove('sunny');
      this.currentSunSnowIcon.classList.remove('snow');
      this.currentIcon.classList.remove('flake');
      this.currentIcon.classList.remove('sun');
      this.currentIcon2.classList.remove('rain');
      this.currentIcon2.classList.remove('ray');
      this.currentIcon.classList.add('cloud');
      this.currentIcon2.classList.add('cloud');
      this.currentForecastPanel.style.backgroundImage = 'url(img/cloudy.jpg)';

    } else if (currentCondition.includes('rain')) {
      this.currentIcon.classList.remove('flake');
      this.currentIcon2.classList.remove('cloud');
      this.currentSunSnowIcon.classList.remove('sunny');
      this.currentIcon.classList.remove('sun');
      this.currentIcon2.classList.remove('rays');
      this.currentIcon.classList.add('cloud');
      this.currentIcon2.classList.add('rain');
      this.currentForecastPanel.style.backgroundImage =
        'url(img/cloudy.jpg)';

    } else if (currentCondition.includes('snow', 'flurry', 'flake')) {
      this.currentForecastPanel.style.backgroundImage = 'url(img/cloudy.jpg)';
      this.currentSunSnowIcon.classList.add(snow);
      this.currentIcon.classList.remove('cloud');
      this.currentIcon2.classList.remove('cloud');
      this.currentIcon.classList.add('flake');
      this.currentIcon2.classList.add('flake');

    } else if (currentCondition.includes('sunny', 'sun')) {
      this.currentForecastPanel.style.backgroundImage = 'url(img/sunny.jpg)';
      this.currentIcon.classList.remove('cloud');
      this.currentIcon2.classList.remove('cloud');
      this.currentSunSnow.classList.add('sunny');
      this.currentIcon.classList.add('sun');
      this.currentIcon2.classList.add('rays');

    } else if (currentCondition.includes('clear')) {
      this.currentIcon.classList.remove('cloud');
      this.currentIcon2.classList.remove('cloud');
      this.currentcon.classList.remove('flake');
      this.currentcon2.classList.remove('rain');
      this.currentIcon2.classList.remove('cloud');
      this.currentSunSnowIcon.classList.remove('sunny');
      this.currentIcon.classList.remove('sun');
      this.currentIcon2.classList.remove('rays');
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

    } else if (tonightDescription.includes('clear')) {}

    // Tomorrow's Weather
    if (tomorrowConditionDescription.includes('clouds', 'cloudy')) {
      this.tomorrowForecastPanel.style.backgroundImage =
        'url(img/cloudy.jpg)';
      this.tomorrowIcon.classList.add('cloud');
      this.tomorrowIcon2.classList.add('cloud');

    } else if (tomorrowConditionDescription.includes('rain')) {
      this.tomorrowIcon.classList.remove('flake');
      this.tomorrowIcon2.classList.remove('cloud');
      this.tomorrowSunSnowIcon.classList.remove('sunny');
      this.tomorrowIcon.classList.remove('sun');
      this.currentIcon2.classList.remove('rays');
      this.tomorrowIcon.classList.add('cloud');
      this.tomorrowIcon2.classList.add('rain');
      this.tomorrowForecastPanel.style.backgroundImage =
        'url(img/cloudy.jpg)';

    } else if (tomorrowConditionDescription.includes('snow', 'flurry', 'flake', 'sun', 'sunny')) {
      this.tomorrowForecastPanel.style.backgroundImage =
        'url(img/cloudy.jpg)';
      this.tomorrowSunSnowIcon.classList.add(snow);
      this.tomorrowIcon.classList.remove('cloud');
      this.tomorrowIcon.classList.remove('sun');
      this.tomorrowIcon2.classList.remove('rain');
      this.tomorrowIcon2.classList.remove('cloud');
      this.tomorrowIcon.classList.add('flake');
      this.tomorrowIcon2.classList.add('flake');

    } else if (tomorrowConditionDescription.includes('sunny', 'sun')) {
      this.tomorrowForecastPanel.style.backgroundImage = 'url(img/sunny.jpg)';
      this.tomorrowIcon.classList.remove('cloud');
      this.tomorrowIcon.classList.remove('flake');
      this.tomorrowIcon2.classList.remove('rain');
      this.tomorrowIcon2.classList.remove('cloud');
      this.tomorrowSunSnowIcon.classList.add('sunny');
      this.tomorrowIcon.classList.add('sun');
      this.currentIcon2.classList.add('rays');

    } else if (tomorrowConditionDescription.includes('clear')) {
      this.tomorrowIcon.classList.remove('cloud');
      this.tomorrowIcon.classList.remove('flake');
      this.tomorrowIcon2.classList.remove('rain');
      this.tomorrowIcon2.classList.remove('cloud');
      this.tomorrowSunSnowIcon.classList.remove('sunny');
      this.tomorrowIcon.classList.remove('sun');
      this.currentIcon2.classList.remove('rays');
      this.tomorrowForecastPanel.style.backgroundImage = 'url(img/sunny.jpg)';
    }
  }
}


const cityInput = document.querySelector('#city__input');
const searchBtn = document.querySelector('#search__btn');

// class instances
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
        display.showWeatherPanels();
        display.showWeather(data)
        display.addAnimationBackgroundCurrent(data);
      }
    });
  }

  ajax.getForecast(city).then(data => {
    display.showWeatherPanels();
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
  }, 3000);
};




// function temperatureConverter() {
//   const currentfahrenheit = document.querySelector('#current__fahrenheit');
//   const currentcelsius = document.querySelector('#current__celsius');

//   currentfahrenheit.addEventListener('click', () => {
//     this.currentTemp.textContent = temp;
//     console.log('clicked')
//   })

// }  Still working on it