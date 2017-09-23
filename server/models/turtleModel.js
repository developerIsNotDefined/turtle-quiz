const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const turtleSchema = new Schema({
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