const Turtles = require('../models/turtleModel');

module.exports = app => {

  app.get('/api/turtlesFacts', (req, res) => {

    Turtles.find((err, turtles) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (err){
        res.send(err);
      } else {
        res.send(turtles);
      }
    });

  });
}