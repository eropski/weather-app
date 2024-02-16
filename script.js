// Display typed city and current temp, humidity, conditions, wind, etc.
function displayCityTemperature(response) {
  if (response.data.status !== "not_found") {
    let temperatureElement = document.querySelector(".bigNumber"); // span on html page
    let temperature = Math.round(response.data.temperature.current);
    let h1 = document.querySelector("h1");
    let currentConditions = document.querySelector("#city-conditions");
    let currentHumidity = document.querySelector("#city-humidity");
    let currentWind = document.querySelector("#city-wind");

    currentWind.innerHTML = `${response.data.wind.speed}mph`;
    currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
    currentConditions.innerHTML = response.data.condition.description;
    h1.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
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
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let dayTime = document.querySelector(".day-time");

dayTime.innerHTML = `${day} ${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
