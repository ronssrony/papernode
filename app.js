
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

const client = new Client({
  host: 'dpg-cp6d6vo21fec738gc630-a',
  user: 'ptraylogin_user', // replace with your PostgreSQL username
  password: 'Gq9PlY1OUSplKOKJUjOrWWsOYnqXmrqv', // replace with your PostgreSQL password
  database: 'ptraylogin',
  port: 5432, // default port for PostgreSQL

  ssl: {
    rejectUnauthorized: false,  // This is important for Render connections
  },
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));



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

app.listen(5000, () => {
  console.log("server is started on port 5000");
});

let stripeGateway = stripe(process.env.stripe_api) ;
