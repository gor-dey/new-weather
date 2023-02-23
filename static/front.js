const inputCityBtn = document.querySelector(".inputCityBtn");

const loc = document.querySelector(".loc");
const temperature = document.querySelector(".temperature");
const condition = document.querySelector(".condition");

const windImage = document.querySelector(".wind-img");
const windText = document.querySelector(".wind-speed-text");

const refreshBtn = document.querySelector(".refresh-btn");

const xhr = new XMLHttpRequest();
const fromFront = "/fromfront";

inputCityBtn.addEventListener("click", () => {
  xhr.open("POST", fromFront, false);
  xhr.setRequestHeader("Content-Type", "application/json");

  const inputCityPlace = document.querySelector(".inputCityPlace");
  const inputJson = JSON.stringify({ city: inputCityPlace.value });

  xhr.onload = () => {
    if (xhr.status != 200) {
      throw console.error("Error");
    } else {
      const actualCity = JSON.parse(xhr.responseText).name;
      const country = JSON.parse(xhr.responseText).sys.country;
      const actualTemp = JSON.parse(xhr.responseText).main.temp;
      const skyPurrity = JSON.parse(xhr.responseText).weather[0].main;
      const windSpeed = JSON.parse(xhr.responseText).wind.speed;
      // console.log(windSpeed);

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
const refreshFromFE = "/refreshfromfe";
refreshBtn.addEventListener("click", () => {
  xhr.open("POST", refreshFromFE, false);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    if (xhr.status != 200) {
      throw alert("Ooop... It is error!");
    } else {
      const actualCity = JSON.parse(xhr.responseText).name;
      const country = JSON.parse(xhr.responseText).sys.country;
      const actualTemp = JSON.parse(xhr.responseText).main.temp;
      const skyPurrity = JSON.parse(xhr.responseText).weather[0].main;
      const windSpeed = JSON.parse(xhr.responseText).wind.speed;
      // console.log(windSpeed);

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

  xhr.send();
});



