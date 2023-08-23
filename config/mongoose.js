const { default: mongoose } = require("mongoose");

// const mongoose = require(mongoose)
mongoose.connect("mongodb://localhost/contact_list_db");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "error connecting to the DB"));
db.once("open", function () {
  console.log("Successfully connected to DB");
});
// sudo systemctl start mongod -- to start mongoDb on ubuntu
// sudo systemctl stop mongod -- to stop mongoDb on ubuntu
// sudo systemctl status mongod -- to check status of mongoDb on ubuntu
