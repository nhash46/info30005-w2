const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const passport = require('passport');

const mongoose = require("mongoose");

const app = express();
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcryptjs');

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const db = require("./models");
console.log(db);

// use the body-parser middleware, which parses request bodies into req.body
// support parsing of json
app.use(bodyParser.json());
// support parsing of urlencoded bodies (e.g. for forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// GET home page
app.get("/", (req, res) => {
  res.render("index", {
    title: 'Spatium'
    });
});

// Routes
const forumRouter = require("./routes/forumRouter");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");

// auther routes handles by forumRouter
app.use("/forum-posts", forumRouter);

// user routes handled by userRouter
app.use("/user", userRouter);

// comment routes handled by commentRouter
app.use("/comments", commentRouter);

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
  
// start app and listen for incoming requests on port
// app.listen(process.env.PORT || 3000, () => {
app.listen(process.env.PORT || 3000, () => {
    console.log("The library app is running!");
  });
  