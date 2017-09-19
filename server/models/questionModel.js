const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  id: Number,
  type: String,
  text: String,
  possibilities: [{
    id: Number,
    answer: String
  },
  {
    id: Number,
    answer: String
  },
  {
    id: Number,
    answer: String
  },
  {
    id: Number,
    answer: String
  }],
  selected: Boolean,
  correct: Number
});

const Questions = mongoose.model('Questions', questionSchema);

module.exports = Questions;