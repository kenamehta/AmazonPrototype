// inbuilt package imports
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');

// User defined module imports
const Config = require('./config');


//const { checkAuth } = require("./passport");

const app = express();
// setting view engine
app.set('view engine', 'ejs');
// use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use cookie parser to parse request headers
app.use(cookieParser());
// use session to store user data between HTTP requests
app.use(session({
  secret: 'sarthak_amazon_secure_string',
  resave: false,
  saveUninitialized: false,
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));
app.use(cors({ origin: `${Config.applicationAddress}:${Config.applicationPort}`, credentials: true }));
app.use(express.static('./ProfilePictures/Seller'));
app.use(express.static('./ProfilePictures/Customer'));



const server = app.listen(3001, () => {
  console.log('Server listening on port 3001');
});


