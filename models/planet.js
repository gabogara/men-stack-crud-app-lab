const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  distanceFromSun: Number,
  hasRings: Boolean,
  image: String,
});

const Planet = mongoose.model("Planet", planetSchema);

module.exports = Planet;
