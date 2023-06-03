const express = require("express") ;
const app = express();
const path = require('path') ;
const mysql = require("mysql") ;
const dotenv = require('dotenv') ;
const hbs = require('hbs');
dotenv.config({path:'./.env'}) ;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session');


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ptray-login'
    
}); 

    db.connect((error) => {
        if(error){
            console.log(error)
        } 
        else{
            console.log("MYSQL connected")
        }
    });
   
   
 const publicDirectory = path.join(__dirname,'./public')   
 
 app.use(express.static(publicDirectory)) ;
 app.use(express.urlencoded({extended:false})) ;
 app.use(express.json()) ; 
 app.use(session({
    secret: 'ronss1815rony1425////',
    resave: false,
    saveUninitialized: true
  }));
 
 app.set('view engine', 'hbs'); 
app.use('/', require('./routes/pages')); 
app.use('/auth', require('./routes/auth')); 

app.listen(5000 , () => {
    console.log("server is started on port 5000")
}) ; 


