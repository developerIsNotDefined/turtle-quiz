const Question = require('./quiz-questions.model');
const authenticate = require('./../middleware/authenticate');

module.exports = app => {
  app.get('/api/quizQuestions', authenticate, async (req, res) => {
    try{
      const questions = await Question.find();
      res.send(questions);
    } catch(err){
      res.status(400).send(err);
    }
  });
}