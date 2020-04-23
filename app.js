
const express = require("express");

const app = express();

// GET home page
app.get("/", (req, res) => {
    res.send("<H1>Spatium</H1>");
  });

// Routes
const router1 = require("./routes/router1");

// auther routes handles by router1
app.use("/forum_posts", router1);
  
// start app and listen for incoming requests on port
app.listen(process.env.PORT || 3000, () => {
    console.log("The library app is running!");
  });
  