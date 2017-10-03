const Turtle = require('./turtles-facts.model');

module.exports = app => {
  app.get('/api/turtlesFacts', (req, res) => {
    Turtle.find()
      .then(turtles => res.send(turtles))
      .catch(err => res.status(400).send(err));
  });
}