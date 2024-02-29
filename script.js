// Display typed city and current temp, humidity, conditions, wind, etc.
function displayCityTemperature(response) {
  if (response.data.status !== "not_found") {
    let temperatureElement = document.querySelector(".bigNumber"); // span on html page
    let temperature = Math.round(response.data.temperature.current);
    let h1 = document.querySelector("h1");
    let currentConditions = document.querySelector("#city-conditions");
    let currentHumidity = document.querySelector("#city-humidity");
    let currentWind = document.querySelector("#city-wind");
    let dayTime = document.querySelector(".day-time");
    let date = new Date(response.data.time * 1000);
    let icon = document.querySelector(".current-temp-icon");

    icon.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
    dayTime.innerHTML = formatDate(date);
    currentWind.innerHTML = `${response.data.wind.speed}mph`;
    currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
    currentConditions.innerHTML = response.data.condition.description;
    h1.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;

    getForecast(response.data.city);
  } else {
    alert(
      "We can't find that city in our database. Please check for a misspelling and try typing your city name again."
    );
  }
}

//Call API
function findCityApi(city) {
  let apiKey = "9c0e95f0fc9fca107302467o2fac95tb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCityTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#searched-city");
  findCityApi(searchedCity.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSearchSubmit);

findCityApi("Anchorage");

//Day of week and time updated
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return `${day} ${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
}

// Forecast
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "9c0e95f0fc9fca107302467o2fac95tb";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiURL).then(displayForecast);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
    <div class="weater-forecast-day">${formatForecastDay(day.time)}</div>
    <div class="weather-forecast-icon">
    <img src="${day.condition.icon_url}"/> </div>
    <div class="weater-forecast-temperature">
        <span class="weather-forecast-high">
        ${Math.round(day.temperature.maximum)}°</span> -
        <span class="weather-forecast-low">${Math.round(
          day.temperature.minimum
        )}°</span>
    </div>
`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}
displayForecast();
