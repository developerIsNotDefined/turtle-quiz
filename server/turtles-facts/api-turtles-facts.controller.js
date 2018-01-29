const Turtle = require('./turtles-facts.model');

module.exports = app => {
  app.get('/api/turtlesFacts', async (req, res) => {
    try{
      const turtles = await Turtle.find();
      res.send(turtles);
    } catch(err){
      res.status(400).send(err);
    }
  });
}