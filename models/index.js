const mongoose = require("mongoose");
const config = require("../config/database")

// Connect to MongoDB
CONNECTION_STRING = "mongodb+srv://nhash:<password>@mylibraryapp-n8rlv.mongodb.net/test?retryWrites=true&w=majority";
MONGO_URL = CONNECTION_STRING.replace("<password>", "1234");

console.log(MONGO_URL);



mongoose.connect(MONGO_URL || config.database, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: "spatium"
});

const db = mongoose.connection;
db.on("error", err => {
  console.error(err);
  process.exit(1);
});
db.once("open", async () => {
  console.log("Mongo connection started on " + db.host + ":" + db.port);
});

require("./forum");
require("./user");
require("./comment");
require("./consultation");
