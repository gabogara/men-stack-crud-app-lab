const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const Planet = require("./models/planet.js");
const app = express();
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

// GET /planets/new
app.get("/planet/new", (req, res) => {
  res.send("This route sends the user a form page!");
});

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
