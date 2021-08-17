"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var config = require('config');
global.tokenConfig = require('./config/tokenConfig');

var cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/db_iConnect', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
app.use(
  cors({
    origin: [
      'http://localhost:5001',
      'http://localhost:80',
      'http://localhost:3000'
    ],
    credentials: true
  })
);
app.use(express.static(__dirname + '/'));
console.log('the Dir name', __dirname);


const signInController = require('./routes/unauthorizedEndPoints/signInController');
const signUpController = require('./routes/unauthorizedEndPoints/signUpController');


app.use('/signIn', signInController);
app.use('/signUp', signUpController);


config = config.get('app');
var server = app.listen(config.port, function() {
  console.log('Listening for request Port:', config.port);
});