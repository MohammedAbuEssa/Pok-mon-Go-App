require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const pokemonRouter = require("./routes/pokemonRoutes");
const errorHandler = require("./handlers/errorHandler");
app.use(cors());

app.use(express.json());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(pokemonRouter);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("server is running");
});

function start(port) {
  app.listen(port, () => {
    console.log(`The website is up and listen on port ${port}`);
  });
}
module.exports = {
  app: app,
  start: start,
};
