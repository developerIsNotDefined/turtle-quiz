const Turtle = require('../models/turtleModel');

module.exports = app => {

  app.get('/api/turtlesFacts', (req, res) => {

    Turtle.find().then(turtles => {
      res.send(turtles);
    }, err => {
      res.status(400).send(err);
    });

  });
}