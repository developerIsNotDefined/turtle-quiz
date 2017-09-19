const Questions = require('../models/questionModel');

module.exports = app => {

  app.get('/api/quizQuestions', (req, res) => {

    Questions.find((err, questions) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (err){
        res.send(err);
      } else {
        questions.sort((a, b) => a.id - b.id);
        res.send(questions);
      }
    });

  });
}