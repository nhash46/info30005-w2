const mongoose = require("mongoose");

// Connect to MongoDB
CONNECTION_STRING = "mongodb+srv://spatium:<password>@mylibraryapp-p1g0j.mongodb.net/test?retryWrites=true&w=majority";
MONGO_URL = CONNECTION_STRING.replace("<password>", "spatium");

console.log(MONGO_URL);



mongoose.connect(MONGO_URL || "mongodb://localhost/info30005", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: "mylibraryapp"
});

const db = mongoose.connection;
db.on("error", err => {
  console.error(err);
  process.exit(1);
});
db.once("open", async () => {
  console.log("Mongo connection started on " + db.host + ":" + db.port);
});

require("./author");