const Question = require('./quiz-questions.model');
const authenticate = require('./../middleware/authenticate');

module.exports = app => {
  app.get('/api/quizQuestions', authenticate, (req, res) => {
    Question.find()
      .then(questions => res.send(questions))
      .catch(err => res.status(400).send(err));
  });
}