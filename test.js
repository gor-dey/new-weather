import express, { json, response } from "express";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";
import { XMLHttpRequest } from "xmlhttprequest";
// import fromBackToFront from "./middleware/fromBackToFront.js"

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT ?? 3000;

let resFromOWM = "";



app.post("/refreshfromfe", (req, res) => {
  const city = 'london';
  const keyJsonPath = "./keys/key.json";
  let keyJson = "";
  try {
    const data = fs.readFileSync(keyJsonPath, "utf-8");
    keyJson = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }

  function sendToOpenWeatherMap() {
    //! we got city name from FE
    //! and now we're sending it to OpenWeatherMap (later 'Owm')

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
  sendToOpenWeatherMap();

  res.send(resFromOWM);
});