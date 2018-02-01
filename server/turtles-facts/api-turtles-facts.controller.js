const Turtle = require('./turtles-facts.model');
const {tryCatchHelper, mongoErrorsFormattingHelper} = require('./../middleware/errorhelpers');

module.exports = app => {
  app.get('/api/turtlesFacts', async (req, res) => {
    let err, turtles;

    [err, turtles] = await tryCatchHelper(Turtle.find());
    if (!turtles)
      return res.status(400).send(mongoErrorsFormattingHelper(err));

    res.send(turtles);
  });
}