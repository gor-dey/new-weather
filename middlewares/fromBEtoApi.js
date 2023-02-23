import { XMLHttpRequest } from "xmlhttprequest";
let resFromOWM = "";

export function fromBEtoApi(keyJson, city) {

  const apiKey = keyJson.apiKey;
  const units = keyJson.units;

  const xhr = new XMLHttpRequest();
  const OwmUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  xhr.open("GET", OwmUrl, false);
  xhr.onload = () => {
    if (xhr.status != 200) {
      throw console.error("Error");
    } else {
      resFromOWM = xhr.responseText;
    }
  };
  xhr.send(OwmUrl);
}