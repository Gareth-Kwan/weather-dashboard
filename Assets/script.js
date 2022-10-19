// Variable Declaration
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");
let dashCityName = document.querySelector(".dashboard_cityName");
let dashDescription = document.querySelector(".dashboard_description");
let dashTemp = document.querySelector(".dashboard_temp");
let dashWind = document.querySelector(".dashboard_wind");
let dashHumidity = document.querySelector(".dashboard_humidity");
let dashIcon = document.querySelector(".dashboard_icon");
let fiveDayForecast = document.querySelector(".fiveDayForecast");
let history = document.querySelector(".history");
let historyUl = document.querySelector(".historyUl");
let weatherDashBoard = document.querySelector(".weatherDashBoard");
let historyList = document.querySelector(".historyList");

let cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];

//API Variables
let APIKey = "56fd51a87db5dd7df7ddaa8c41913fa4";
let weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?appid=" + APIKey + "&units=metric&q=";

//Function to render the Weather Dashboard
function renderWeatherDashboard(cityName) {
  fetch(weatherAPI + cityName)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      dashCityName.textContent = "City: " + data.city.name + " (" + data.list[0].dt_txt.split(" ")[0] + ")";
      dashDescription.textContent = "Description: " + firstCapCityName(data.list[0].weather[0].description);
      dashTemp.textContent = "Temperature: " + data.list[0].main.temp + "°C";
      dashWind.textContent = "Wind Speed: " + data.list[0].wind.speed + "Km/h";
      dashHumidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
      weatherDashBoard.style.border = "2px solid black";
      let dashWeatherPicture = document.createElement("img");
      dashWeatherPicture.src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
      dashIcon.innerHTML = " ";
      dashIcon.appendChild(dashWeatherPicture);
    });
}

// Function to render the 5 day forecast
function renderFiveDayForecast(cityName) {
  fetch(weatherAPI + cityName)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      fiveDayForecast.innerHTML = " ";
      days = [0, 7, 15, 23, 31];
      days.forEach(function (i) {
        let divEl = document.createElement("div");
        let forecastDate = document.createElement("p");
        let forecastTemp = document.createElement("p");
        let forecastWind = document.createElement("p");
        let forecastHumidity = document.createElement("p");
        let forecastWeatherPicture = document.createElement("img");
        forecastDate.textContent = "Date: " + data.list[i].dt_txt.split(" ")[0];
        forecastTemp.textContent = "Temperature: " + data.list[i].main.temp + "°C";
        forecastWind.textContent = "Wind Speed: " + data.list[i].wind.speed + "Km/h";
        forecastHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
        divEl.setAttribute("class", "fiveDayForecastCard");
        forecastWeatherPicture.src = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
        divEl.appendChild(forecastDate);
        divEl.appendChild(forecastWeatherPicture);
        divEl.appendChild(forecastTemp);
        divEl.appendChild(forecastWind);
        divEl.appendChild(forecastHumidity);
        fiveDayForecast.appendChild(divEl);
      });
    });
}

function firstCapCityName(cityName) {
  return cityName[0].toUpperCase() + cityName.slice(1);
}

//Function to render local storage
function renderLocalStorageCityName() {
  //Empty the html element container of the button list items
  historyUl.innerHTML = " ";
  for (let i = 0; i < cityHistory.length; i++) {
    let historyList = document.createElement("li");
    historyList.textContent = firstCapCityName(cityHistory[i]);
    historyList.setAttribute("class", "historyList");
    historyUl.appendChild(historyList);
  }
}

//Click event function when you click search
searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  let cityName = searchInput.value;
  cityName = cityName.toLowerCase();

  //To prevent the function from trigger if the search box is empty
  if (cityName === " " || cityName === "") {
    return;
  }

  //If function to check if cityName is already a city inside the cityHistory array
  if (!cityHistory.includes(cityName)) {
    cityHistory.push(cityName);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
  }

  //Invoke Functions
  renderWeatherDashboard(cityName);
  renderFiveDayForecast(cityName);
  renderLocalStorageCityName();
});

//Invoke local store when the page loads
renderLocalStorageCityName();

//Click event listener and use City history as the search result
historyUl.addEventListener("click", function (event) {
  let nameOfCity = event.target.textContent;
  renderWeatherDashboard(nameOfCity);
  renderFiveDayForecast(nameOfCity);
});
