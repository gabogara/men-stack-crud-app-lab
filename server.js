const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const Planet = require("./models/planet.js");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

//Home
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /Show all planets
app.get("/planet", async (req, res) => {
  const allPlanet = await Planet.find();
  console.log(allPlanet);
  res.render("planet/index.ejs", { planets: allPlanet });
});

// GET /planets/new
app.get("/planet/new", (req, res) => {
  res.render("planet/new.ejs");
});

// POST / Create planet
app.post("/planet", async (req, res) => {
  if (req.body.hasRings === "on") {
    req.body.hasRings = true;
  } else {
    req.body.hasRings = false;
  }
  await Planet.create(req.body);
  res.redirect("/planet/new");
});


// SHOW - Show a specific planet
// GET /plants/:planetId
app.get("/planet/:planetId", async (req, res) => {
  const foundPlanet = await Planet.findById(req.params.planetId);
  res.render("planet/show.ejs", { planet: foundPlanet });
});

// EDIT - form to edit a planet
// GET /planet/:planetId/edit
app.get("/planet/:planetId/edit", async (req, res) => {
  const foundPlanet = await Planet.findById(req.params.planetId);
  res.render("planet/edit.ejs", {
    planet: foundPlanet,
  });
});


// UPDATE - update a planet in the DB
// PUT /planet/:planetId
app.put("/planet/:planetId", async (req, res) => {
  // Handle the 'hasRings' checkbox data
  if (req.body.hasRings === "on") {
    req.body.hasRings = true;
  } else {
    req.body.hasRings = false;
  }

  // Update the planet in the database
  await Planet.findByIdAndUpdate(req.params.planetId, req.body);

  // Redirect to the planet's show page to see the updates
  res.redirect(`/planet/${req.params.planetId}`);
});

// DELETE - delete a planet
// DELETE /planet/:planetId
app.delete("/planet/:planetId", async (req, res) => {
  await Planet.findByIdAndDelete(req.params.planetId);
  res.redirect("/planet");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
