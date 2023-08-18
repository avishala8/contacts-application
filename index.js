const express = require("express");
const { url } = require("inspector");
const path = require("path");
const port = 8000;
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

var contactList = [
  {
    name: "Abhishek Vishala",
    phone: "8534820552",
  },
  {
    name: "Abhishek 1",
    phone: "11111111111",
  },
  {
    name: "Abhishek 2",
    phone: "331111112222",
  },
  {
    name: "Abhishek 3",
    phone: "3333333333",
  },
];

app.get("/", function (req, res) {
  return res.render("home", {
    title: "ContactsList",
    contact_list: contactList,
  });
});
app.post("/create-contact", function (req, res) {
  contactList.push(req.body);
  return res.redirect("/");
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Server is Running on port ", port);
});
