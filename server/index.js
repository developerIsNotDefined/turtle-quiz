const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDb = require('mongoose-connect-db');
const apiTurtlesFacts = require('./turtles-facts/api-turtles-facts.controller');
const apiQuizQuestions = require('./quiz-questions/api-quiz-questions.controller');
const apiUsers = require('./users/api-users.controller');

// userName: "admin"
// password: "admin"
// mongodb://<dbuser>:<dbpassword>@ds137054.mlab.com:37054/turtle-quiz

const app = express();

const port = process.env.PORT || 3003;
process.env.JWT_SECRET_KEY = 'my_jwt_secret_key';
const dbConnectUrl = "mongodb://admin:admin@ds137054.mlab.com:37054/turtle-quiz";

connectDb(mongoose, dbConnectUrl);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
})

apiTurtlesFacts(app);
apiQuizQuestions(app);
apiUsers(app);

app.listen(port);
