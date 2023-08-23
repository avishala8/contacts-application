const express = require("express");
const { url } = require("inspector");
const path = require("path");
const port = 8000;

// var popup = require("popups");
let alert = require("alert");

const db = require("./config/mongoose");
const Contacts = require("./models/contacts");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));

// var contactList = [
//   {
//     name: "Abhishek Vishala",
//     phone: "8534820552",
//   },
//   {
//     name: "Abhishek 1",
//     phone: "11111111111",
//   },
//   {
//     name: "Abhishek 2",
//     phone: "331111112222",
//   },
//   {
//     name: "Abhishek 3",
//     phone: "33333333",
//   },
// ];

app.get("/", function (req, res) {
  Contacts.find({})
    .then((contactList) => {
      return res.render("home", {
        title: "ContactsList",
        contact_list: contactList,
      });
    })
    .catch((err) => {
      console.log("error in fetching the contacts from Db"), err;

      return;
    });
});
app.post("/create-contact", function (req, res) {
  // contactList.push(req.body);
  Contacts.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  })
    .then((result) => {
      console.log("** new contact created **", result);
      return res.redirect("back");
    })
    .catch((err) => {
      alert("Email already exist for another User!");

      console.log(
        "error in creating the contact in /create-contact route",
        err
      );
      return;
    });
});
app.get("/delete-contact/", function (req, res) {
  let id = req.query.id;
  Contacts.findByIdAndDelete(id)
    .then()
    .catch((err) => {
      console.log("error in deleting an obj from DB");
      return;
    });

  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Server is Running on port ", port);
});
