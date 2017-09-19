const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDb = require('mongoose-connect-db');
const apiTurtlesFacts = require('./apiControllers/turtlesFacts');
const apiQuizQuestions = require('./apiControllers/quizQuestions');

// userName: "admin"
// password: "admin"
// mongodb://<dbuser>:<dbpassword>@ds137054.mlab.com:37054/turtle-quiz

const dbConnectUrl = "mongodb://admin:admin@ds137054.mlab.com:37054/turtle-quiz";

connectDb(mongoose, dbConnectUrl);

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

app.listen(3003);
