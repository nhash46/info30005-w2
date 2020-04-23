
const express = require("express");

const app = express();

require("./models");

// GET home page
app.get("/", (req, res) => {
    res.send("<H1>Spatium</H1>");
  });

// Routes
const forumRouter = require("./routes/forumRouter");
const userRouter = require("./routes/userRouter");

// auther routes handles by forumRouter
app.use("/forum-posts", forumRouter);

// user routes handled by userRouter
app.use("/user", userRouter);
  
// start app and listen for incoming requests on port
app.listen(process.env.PORT || 3000, () => {
    console.log("The library app is running!");
  });
  