const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDb = require('mongoose-connect-db');
const apiTurtlesFacts = require('./apiControllers/turtlesFacts');
const apiQuizQuestions = require('./apiControllers/quizQuestions');

// userName: "admin"
// password: "admin"
// mongodb://<dbuser>:<dbpassword>@ds137054.mlab.com:37054/turtle-quiz

const app = express();
const port = process.env.PORT || 3003;
const dbConnectUrl = "mongodb://admin:admin@ds137054.mlab.com:37054/turtle-quiz";

connectDb(mongoose, dbConnectUrl);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
})

apiTurtlesFacts(app);
apiQuizQuestions(app);

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + dbConnectUrl);
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

app.listen(port);
