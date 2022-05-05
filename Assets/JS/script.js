// global variables
const searchHistory = [];
// const weatherApiUrl = "https://api.openweathermap.org/";
const apiKey = "0b9cf8e248c74890b8003413222504";
var cityInput;

//DOM references
var searchForm = document.querySelector("#search-form");
var cityHeading = document.querySelector(".city");
var currentTemp = document.querySelector(".current-temp");
var currentWind = document.querySelector(".current-wind");
var currentHumidity = document.querySelector(".current-humidity");
var currentUv = document.querySelector(".current-uv");
var forecastEl = document.querySelector("#forecast");
var submitBtn = document.querySelector(".search-button");
var searchDisplayBoxEl = document.querySelector("#search-input");

var savedCities = [];

function citySubmit(event) {
  event.preventDefault();
  cityInput = document.getElementById("search-input").value;

  weatherData(cityInput);

  // create local storage
  savedCities.push(cityInput);
  localStorage.setItem("city", JSON.stringify(savedCities));
  JSON.parse(localStorage.getItem("city"));

  forecastEl.innerHTML = "";
}

submitBtn.addEventListener("click", citySubmit);

function weatherData(cityInput) {
  var weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityInput}&days=10&aqi=no&alerts=no`;
  fetch(weatherApiUrl)
    .then(function (response) {
      //turns response into javascript object notation
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.forecast.forecastday[0].date);

      cityHeading.textContent = `${cityInput}`;
      for (let i = 0; i < data.forecast.forecastday.length; i++) {
        var cityInfo = {
          date: data.forecast.forecastday[i].date,
          temp: data.forecast.forecastday[i].day.avgtemp_f,
          wind: data.forecast.forecastday[i].day.maxwind_mph,
          humidity: data.forecast.forecastday[i].day.avghumidity,
        };

        var currentDate = moment(cityInfo.date).format("MMMM DD, YYYY");

        var futureCardTemplate = $(`
                  <div id="custom-card" class="card mr-3" style="width: 15rem;">
              <div class="card-body">
                <h5 class="card-title">${currentDate}</h5>
                <p class="card-text">Temp: ${cityInfo.temp}℉</p>
                <p class="card-text">Wind: ${cityInfo.wind} MPH</p>
                <p class="card-text">Humidity: ${cityInfo.humidity}%</p>
              </div>
          </div>`);

        $("#forecast").append(futureCardTemplate);
      }
    });
}
