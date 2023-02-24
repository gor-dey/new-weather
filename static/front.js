const inputCityBtn = document.querySelector(".inputCityBtn");

const loc = document.querySelector(".loc");
const temperature = document.querySelector(".temperature");
const condition = document.querySelector(".condition");

const windImage = document.querySelector(".wind-img");
const windText = document.querySelector(".wind-speed-text");

const refreshBtn = document.querySelector(".refresh-btn");

const xhr = new XMLHttpRequest();
const fromFront = "/fromfront";

let latitude = "";
let longitude = "";
// ! geolocation
function success(pos) {
  const crd = pos.coords;
  lat = crd.latitude;
  lon = crd.longitude;
}
const geo = navigator.geolocation.getCurrentPosition(success);

// ! weather chartx
const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");

const weatherBtn = document.querySelector(".weather");

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "weather forecast",
        data: [],
      },
    ],
  },
});

// ! declarating the localStorage var
let storedCity = localStorage.getItem("storedCity");

inputCityBtn.addEventListener("click", () => {
  xhr.open("POST", fromFront, false);
  xhr.setRequestHeader("Content-Type", "application/json");

  const inputCityPlace = document.querySelector(".inputCityPlace");
  // const inputJson = (JSON.stringify({ city: inputCityPlace.value }));
  // const writenCity = JSON.stringify({ city: inputCityPlace.value });

  const writenCity = { city: inputCityPlace.value };

  if (!writenCity.city) {
    var inputJson = JSON.stringify({ lat: lat, lon: lon });
  } else {
    var inputJson = JSON.stringify(writenCity);
  }

  // ! writing localStorage var
  localStorage.setItem("storedCity", inputJson);

  xhr.onload = () => {
    if (xhr.status != 200) {
      throw alert("Ooop... It is error!");
    } else {
      const actualRes = JSON.parse(xhr.responseText);

      const actualCity = actualRes.name;
      const country = actualRes.sys.country;
      const actualTemp = Math.floor(actualRes.main.temp);
      const skyPurrity = actualRes.weather[0].main;
      const windSpeed = actualRes.wind.speed;

      loc.textContent = `${actualCity}, ${country}`;
      temperature.textContent = `${actualTemp}`;
      condition.textContent = `${skyPurrity}`;

      if (5 > windSpeed) {
        windImage.src = "./windicons/lightwind.png";
        windText.textContent = "wind speed < 5 m/s";
      }
      if (windSpeed >= 5 && 10 > windSpeed) {
        windImage.src = "./windicons/moderatewind.png";
        windText.textContent = "wind speed < 10 m/s";
      }
      if (windSpeed >= 10) {
        windImage.src = "./windicons/strongwind.png";
        windText.textContent = "wind speed > 10 m/s";
      }
    }
  };

  xhr.send(inputJson);
});

// ! Refreshing
const refreshFromFE = "/fromfront";
refreshBtn.addEventListener("click", () => {
  xhr.open("POST", refreshFromFE, false);
  xhr.setRequestHeader("Content-Type", "application/json");

  storedCity = window.localStorage.getItem("storedCity");
  const inputJson = storedCity;

  xhr.onload = () => {
    if (xhr.status != 200) {
      throw alert("Ooop... It is error!");
    } else {
      const actualRes = JSON.parse(xhr.responseText);

      const actualCity = actualRes.name;
      const country = actualRes.sys.country;
      const actualTemp = Math.floor(actualRes.main.temp);
      const skyPurrity = actualRes.weather[0].main;
      const windSpeed = actualRes.wind.speed;

      loc.textContent = `${actualCity}, ${country}`;
      temperature.textContent = `${actualTemp}`;
      condition.textContent = `${skyPurrity}`;

      if (5 > windSpeed) {
        windImage.src = "./windicons/lightwind.png";
        windText.textContent = "wind speed < 5 m/s";
      }
      if (windSpeed >= 5 && 10 > windSpeed) {
        windImage.src = "./windicons/moderatewind.png";
        windText.textContent = "wind speed < 10 m/s";
      }
      if (windSpeed >= 10) {
        windImage.src = "./windicons/strongwind.png";
        windText.textContent = "wind speed > 10 m/s";
      }
    }
  };

  xhr.send(inputJson);
});

// ! weather chart
const chartweather = "/chartweather";

weatherBtn.addEventListener("click", () => {
  xhr.open("POST", chartweather, false);
  xhr.setRequestHeader("Content-Type", "application/json");

  // window.localStorage.removeItem("storedCity");
  storedCity = window.localStorage.getItem("storedCity");

  const inputJson = storedCity;

  xhr.onload = () => {
    if (xhr.status != 200) {
      // throw alert("Ooop... It is error!");
      throw Error;
    } else {
      const actualRes = JSON.parse(xhr.responseText).list;

      let newData = [];
      let newTime = [];
      for (let i = 7; i < actualRes.length; i += 8) {
        newData.push(actualRes[i].main.temp);
        newTime.push(
          new Date(actualRes[i].dt_txt).getDate() +
            "." +
            (new Date(actualRes[i].dt_txt).getMonth() + 1) +
            "." +
            new Date(actualRes[i].dt_txt).getFullYear()
        );
      }

      myChart.config.data.labels = newTime;
      myChart.config.data.datasets[0].data = newData;
      myChart.update();
    }
  };

  xhr.send(inputJson);
});
