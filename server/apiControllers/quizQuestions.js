const Question = require('../models/questionModel');

module.exports = app => {

  app.get('/api/quizQuestions', (req, res) => {

    Question.find().then(questions => {
      res.send(questions);
    }, err => {
      res.status(400).send(err);
    });

  });
}