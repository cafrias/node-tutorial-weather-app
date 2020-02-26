const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Setup paths
const PUBLIC_PATH = path.join(__dirname, "..", "public");
const VIEWS_PATH = path.join(__dirname, "..", "templates", "views");
const PARTIALS_PATH = path.join(__dirname, "..", "templates", "partials");

// Setup template engine
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);
hbs.registerPartials(PARTIALS_PATH);

// Serve static files
app.use(express.static(PUBLIC_PATH));

// -------------------------------------------------------------------------------------------------
// Routes
// -------------------------------------------------------------------------------------------------
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather!",
    name: "Matracaaa!!",
    author: "El charlo"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    author: "El charlo"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpMessage: "This a useful help message",
    author: "El charlo"
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    res.send({
      error: "You must provide an address"
    });
  }

  let location = "";
  geocode(address)
    .then(geocodeResult => {
      location = geocodeResult.location;
      return forecast(geocodeResult.lat, geocodeResult.lon);
    })
    .then(result => {
      res.send({
        forecast: result.forecast,
        location,
        address
      });
    })
    .catch(err => {
      res.send({
        error: err.message
      });
    });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help page not found",
    author: "El charlo"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    author: "El charlo"
  });
});

// -------------------------------------------------------------------------------------------------
// Init application
// -------------------------------------------------------------------------------------------------
app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
