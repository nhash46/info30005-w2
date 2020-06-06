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
const rateLimit = require('express-rate-limit');
const cors = require('cors');
app.locals.moment = require('moment');

const limiter = rateLimit({
  windowMs: 15*60*1000, // 30 minutes
  max: 3600 // limit each IP to 1000 requests per windowMs i.e. user is allowed to make 120 requests per minute
});

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

// apply limiter to all requests
app.use(limiter);

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

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

// global user object
app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});


// GET home page
app.get("/", (req, res) => {
  res.render("index", {
    title: 'Spatium'
    });
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

// Routes
const forumRouter = require("./routes/forumRouter");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");
const consultationRouter = require("./routes/consultationRouter")

// auther routes handles by forumRouter
app.use("/forum-posts", forumRouter);

// user routes handled by userRouter
app.use("/user", userRouter);

// comment routes handled by commentRouter
app.use("/comments", commentRouter);

// consultation routes handled by consultationRouter
app.use("/consultations", consultationRouter);

// start app and listen for incoming requests on port
// app.listen(process.env.PORT || 3000, () => {
app.listen(process.env.PORT || 3000, () => {
  console.log("The library app is running!");
});