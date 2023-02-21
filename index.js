import express from "express";
import path from "path";
// import { fromFront } from "./static/front.js";

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

app.post("/fromfront", (req, res) => {
  console.log('From FE')
  res.send( );
});





app.listen(`${PORT}`, () => {
  console.log(`gordey's weather program has started on port ${PORT}...`);
});
