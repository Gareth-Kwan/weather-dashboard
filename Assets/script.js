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

//Click event function when you click search
searchButton.addEventListener("click", function () {
  let cityName = searchInput.value;
  let APIKey = "56fd51a87db5dd7df7ddaa8c41913fa4";
  let weatherAPI =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=metric";

  //Function to render the Weather Dashboard
  function renderWeatherDashboard() {
    fetch(weatherAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        // console.log(data.city.name);
        // console.log(data.list[0].weather[0].description);
        // console.log(data.list[0].main.temp);
        // console.log(data.list[0].weather[0].icon);
        // console.log(data.list[0].wind.speed);
        // console.log(data.list[0].main.humidity);
        dashCityName.textContent = "City: " + data.city.name + " (" + data.list[0].dt_txt + ")";
        dashDescription.textContent = "Description: " + data.list[0].weather[0].description;
        dashTemp.textContent = "Temperature: " + data.list[0].main.temp + "°C";
        dashWind.textContent = "Wind Speed: " + data.list[0].wind.speed + "Km/h";
        dashHumidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
        let weatherDashBoard = document.querySelector(".weatherDashBoard");
        weatherDashBoard.style.border = "2px solid black";
        let dashWeatherPicture = document.createElement("img");
        dashWeatherPicture.src = data.list[0].weather[0].icon;
        dashIcon.appendChild(dashWeatherPicture);
      });
  }

  // Function to render the 5 day forecast
  function renderFiveDayForecast() {
    fetch(weatherAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        days = [0, 7, 15, 23, 31];

        days.forEach(function (i) {
          // console.log(data);
          // console.log(data.list[i].main.temp);
          // console.log(data.list[i].weather[0].icon);
          // console.log(data.list[i].wind.speed);
          // console.log(data.list[i].main.humidity);
          let divEl = document.createElement("div");
          let forecastDate = document.createElement("p");
          let forecastTemp = document.createElement("p");
          let forecastWind = document.createElement("p");
          let forecastHumidity = document.createElement("p");
          forecastDate.textContent = "Date: " + data.list[i].dt_txt;
          forecastTemp.textContent = "Temperature: " + data.list[i].main.temp + "°C";
          forecastWind.textContent = "Wind Speed: " + data.list[i].wind.speed + "Km/h";
          forecastHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
          divEl.setAttribute("class", "fiveDayForecastCard");
          divEl.appendChild(forecastDate);
          divEl.appendChild(forecastTemp);
          divEl.appendChild(forecastWind);
          divEl.appendChild(forecastHumidity);
          fiveDayForecast.appendChild(divEl);
        });
      });
  }
  //Invoke Functions
  renderWeatherDashboard();
  renderFiveDayForecast();
});
