import express, { json, response } from "express";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";
// import { sendToOpenWeatherMap } from "./middlewares/sendToOpenWeatherMap.js"
import axios from "axios";

// import { fromBEtoApi } from "./middlewares/fromBEtoApi.js";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT ?? 3000;

let resFromOWM = "";
const keyJsonPath = "./keys/key.json";
const cityJsonPath = "./keys/lastCity.json";

app.use(express.static(path.resolve(__dirname, "static")));

app.use(bodyParser.json());

app.post("/fromfront", (req, res) => {
  if (req.body.city) {
    var loco = `q=${req.body.city}`;
  }
  if (req.body.lat) {
    var loco = `lat=${req.body.lat}&lon=${req.body.lon}`;
  }
  // const city = req.body.city;

  let keyJson = "";
  try {
    const data = fs.readFileSync(keyJsonPath, "utf-8");
    keyJson = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }

  function sendToOpenWeatherMap() {
    // ! we got city name from FE
    // ! and now we're sending it to OpenWeatherMap (later 'Owm')

    const apiKey = keyJson.apiKey;
    const units = keyJson.units;
    const OwmUrl = `http://api.openweathermap.org/data/2.5/weather?${loco}&appid=${apiKey}&units=${units}`;

    axios.get(OwmUrl)
    .then(function (response) {
      resFromOWM = response.data;
      return res.send(resFromOWM);
    });
  }
  sendToOpenWeatherMap();

  // res.send(resFromOWM);
});

app.listen(`${PORT}`, () => {
  console.log(`gordey's weather program has started on port ${PORT}...`);
});

// * for forecast
// * const OwmUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

// ==========================>

// ! chart weather

// ==========================>

app.post("/chartweather", (req, res) => {
  // const city = req.body.city;

  if (req.body.city) {
    var loco = `q=${req.body.city}`;
  }
  if (req.body.lat) {
    var loco = `lat=${req.body.lat}&lon=${req.body.lon}`;
  }
  // * Why error evetry time?
  // else {
  //   throw Error
  // }

  let keyJson = "";
  try {
    const data = fs.readFileSync(keyJsonPath, "utf-8");
    keyJson = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }

  //! we got city name from FE
  //! and now we're sending it to OpenWeatherMap (later 'Owm')

  function sendToOpenWeatherMap() {
    // ! we got city name from FE
    // ! and now we're sending it to OpenWeatherMap (later 'Owm')

    const apiKey = keyJson.apiKey;
    const units = keyJson.units;
    const OwmUrl = `http://api.openweathermap.org/data/2.5/forecast?${loco}&appid=${apiKey}&units=${units}`;

    axios.get(OwmUrl)
    .then(function (response) {
      resFromOWM = response.data;
      return res.send(resFromOWM);
    });
  }
  
  sendToOpenWeatherMap();

  // fromBEtoApi(keyJson, city)
});
