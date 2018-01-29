const mongoose = require('mongoose');

const turtleSchema = new mongoose.Schema({
  id: Number,
  type: String,
  image_url: String,
  locations: String,
  size: String,
  lifespan: String,
  diet: String,
  description: String
});

const Turtle = mongoose.model('Turtle', turtleSchema);

module.exports = Turtle;