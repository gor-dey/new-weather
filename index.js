import express, { json, response } from "express";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";
import { XMLHttpRequest } from "xmlhttprequest";

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
  const city = req.body.city;
  console.log(JSON.stringify(req.body));

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

  // ! creating new "city" for refreshing
  fs.writeFile(cityJsonPath, JSON.stringify(req.body), (err) => {
    if (err) {
      throw err;
    }
  });

  res.send(resFromOWM);
});

app.listen(`${PORT}`, () => {
  console.log(`gordey's weather program has started on port ${PORT}...`);
});

// ! Refrefing
app.post("/refreshfromfe", (req, res) => {
  let city = "";
  try {
    const data = fs.readFileSync(cityJsonPath, "utf-8");
    city = JSON.parse(data).city;
  } catch (err) {
    console.error(err);
  }

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
    const apiKey = keyJson.apiKey;
    const units = keyJson.units;

    const xhr = new XMLHttpRequest();
    const OwmUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    

    // * for forecast
    // * const OwmUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;


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

  // fromBEtoApi(keyJson, city)

  res.send(resFromOWM);
});


