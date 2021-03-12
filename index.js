let key = "9592542d6951d5de319ab2c9f2260303";
let currWeather = getWeatherURL("houston");
let descriptionDOM = document.getElementById("description");
let locationDOM = document.getElementById("location");
let tempDOM = document.getElementById("temp");
let feelsLikeDOM = document.getElementById("feelsLike");
let windDOM = document.getElementById("wind");
let humidityDOM = document.getElementById("humidity");

const searchBoxDOM = document.getElementById("searchBox");
const formDOM = document.getElementById("frm1");

formDOM.addEventListener("submit", searchCity);

function searchCity(e) {
  e.preventDefault();
  let city = searchBoxDOM.value;
  getWeather(getWeatherURL(city));
  formDOM.reset();
}

async function getWeather(weatherURL) {
  const response = await fetch(weatherURL);
  const JSON = await response.json();
  if (JSON.cod >= 400) {
    console.log("error");
    searchBoxDOM.classList.add("is-invalid");
  } else {
    searchBoxDOM.classList.remove("is-invalid");
    console.log(JSON);
    descriptionDOM.innerHTML = JSON.weather[0].description;
    locationDOM.innerHTML = `${JSON.name}, ${JSON.sys.country}`;
    tempDOM.innerHTML = `${JSON.main.temp.toFixed(0)}&deg C`;
    feelsLikeDOM.innerHTML = `Feels like: ${JSON.main.feels_like.toFixed(
      0
    )}&deg C`;
    windDOM.innerHTML = `Wind: ${JSON.wind.speed} MPH`;
    humidityDOM.innerHTML = `Humidity: ${JSON.main.humidity} %`;
  }
}

function getWeatherURL(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
}

function displayError() {
  document.getElementById("errorMessage").innerHTML = "error oh no";
}

getWeather(currWeather).catch((error) => {
  displayError(error);
});
