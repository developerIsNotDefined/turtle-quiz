const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDb = require('mongoose-connect-db');
const apiTurtlesFacts = require('./turtles-facts/api-turtles-facts.controller');
const apiQuizQuestions = require('./quiz-questions/api-quiz-questions.controller');
const apiUsers = require('./users/api-users.controller');

const app = express();

process.env.PORT = 3003;
process.env.JWT_SECRET_KEY = 'my_jwt_secret_key';

const DB_COONECT_URL = 'mongodb://admin:admin@ds137054.mlab.com:37054/turtle-quiz';

connectDb(mongoose, DB_COONECT_URL);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
});

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

app.listen(process.env.PORT);