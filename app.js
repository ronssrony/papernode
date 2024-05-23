
const express = require('express')
const app = express();
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const hbs = require("hbs");
dotenv.config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const fileUpload = require("express-fileupload") ;
const bodyParser = require("body-parser") ;
const stripe = require("stripe") ;
const { Client } = require('pg');

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12708640",
  password: "5bBub7zfHz",
  database: "sql12708640",
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL connected");
  }
});



const publicDirectory = path.join(__dirname, "./public");

app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()) ;
app.use(fileUpload()) ;
app.use(
  session({
    secret: "ronss1815rony1425////",
    resave: false,
    saveUninitialized: true,
  })
);



app.set("view engine", "hbs");
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(3306, () => {
  console.log("server is started on port 3306");
});

let stripeGateway = stripe(process.env.stripe_api) ;
