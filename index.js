import express from "express";
import path from "path";
import bodyParser from "body-parser";
// import fs from "fs";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT ?? 3000;

// const router = express.Router();

// app.set("view engine", "ejs");
// console.log(app.get('view engine'))

// app.
// app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.resolve(__dirname, "static")));

// app.use(fromFront)

app.use(bodyParser.json());

app.post("/fromfront", (req, res) => {
  console.log(req.body);

  res.send("Button works");
});

// app.post("/fromfront", (req, res) => {
//   console.log("From FE");

//   // const cityFromFe = JSON.parse(xhr.responseText);
//   // console.log(cityFromFe)
//   res.send();
// });

app.listen(`${PORT}`, () => {
  console.log(`gordey's weather program has started on port ${PORT}...`);
});
