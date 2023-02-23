

const xhr = new XMLHttpRequest();
const fromFrontToChart = "/fromfronttochart";

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


// =====================================>>>>

const { Chart } = require("chart.js");

const canvas = document.getElementById("chart-weather");

const chart = new Chart(canvas, {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
})
