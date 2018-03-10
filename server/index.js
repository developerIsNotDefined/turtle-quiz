const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDb = require('mongoose-connect-db');
const config = require('./config');
const apiTurtlesFacts = require('./turtles-facts/api-turtles-facts.controller');
const apiQuizQuestions = require('./quiz-questions/api-quiz-questions.controller');
const apiUsers = require('./users/api-users.controller');

const app = express();

process.env.JWT_SECRET_KEY = config.JWT_SECRET_KEY;

connectDb(mongoose, config.DB_CONNECT_URL);

app.use(bodyParser.json());

config.cors(app);

// START response delay
app.all('*', (req, res, next) => {
  setTimeout(() => {
    next();
  }, 3000);
});
// END response delay

apiTurtlesFacts(app);
apiQuizQuestions(app);
apiUsers(app);

app.listen(config.PORT);