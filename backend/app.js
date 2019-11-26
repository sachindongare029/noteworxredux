var express = require("express");
var bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
var app = express();
const notesApi = require("./app/routes/note.routes.js");
var port = 3001;

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", function(req,res) {res.send("welcome")});
app.use("/", notesApi);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
