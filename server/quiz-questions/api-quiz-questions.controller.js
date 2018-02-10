const Question = require('./quiz-questions.model');
const authenticate = require('./../middleware/authenticate');
const {tryCatchHelper, mongoErrorsFormattingHelper} = require('./../helpers/errorhelpers');

module.exports = app => {
  app.get('/api/quizQuestions', authenticate, async (req, res) => {
    let err, questions;

    [err, questions] = await tryCatchHelper(Question.find());
    if (!questions)
      return res.status(400).send(mongoErrorsFormattingHelper(err));

    res.send(questions);
  });
}