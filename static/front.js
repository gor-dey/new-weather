const inputCityBtn = document.querySelector(".inputCityBtn");

const xhr = new XMLHttpRequest();
const fromFront = "/fromfront";

inputCityBtn.addEventListener("click", () => {
  xhr.open("POST", fromFront);
  const inputCityPlace = document.querySelector(".inputCityPlace");
  const inputJson = JSON.stringify(`"city": "${inputCityPlace.value}"`);

  xhr.send(json);
});
