const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const db = require("./models");
console.log(db);

// Bring in models
let Forum = require("./models/forum");

// use the body-parser middleware, which parses request bodies into req.body
// support parsing of json
app.use(bodyParser.json());
// support parsing of urlencoded bodies (e.g. for forms)
app.use(bodyParser.urlencoded({ extended: true }));

// GET home page
app.get("/", (req, res) => {
    res.render("index", {
      title: 'Spatium'
    });
  });

// GET forum page
app.get("/forum-posts", (req, res) => {

  Forum.find({}, function(err, forums){

    if(err){
      console.log(err);
    } else {
      res.render("forum-posts", {
        title: 'Forums',
        forums: forums
      });
    }
  });

  /*
  let forums = [
    {
      id:1,
      title: 'Forum One',
      author:'Naz',
      body:'This is forum one'
    },
    {
      id:2,
      title: 'Forum two',
      author:'Naz',
      body:'This is forum two'
    }
  ];
  */
  
});

// Routes
const forumRouter = require("./routes/forumRouter");
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");

// auther routes handles by forumRouter
app.use("/forum-posts", forumRouter);

// user routes handled by userRouter
app.use("/user", userRouter);

app.use("/comments", commentRouter);
  
// start app and listen for incoming requests on port
// app.listen(process.env.PORT || 3000, () => {
app.listen(process.env.PORT || 3000, () => {
    console.log("The library app is running!");
  });
  