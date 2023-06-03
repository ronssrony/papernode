const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'ptray-login'
  
}); 

exports.register = (req, res) => {

  console.log(req.body);

  const { name, email, password } = req.body;
  db.query('SELECT email FROM user WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if ( results.length > 0) {
      return res.render('register', {
        message: 'That Email is already taken',
        showErrorPopup:true 
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    db.query('INSERT INTO user SET ?', { username: name, email: email, password:hashedPassword }, (error, results) => {
      if (error) {
        console.log(error);
      } else {  
        return res.render('login', {
          message: 'User registered',
          showErrorPopup:false
        });
      }
    });
  });
 
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.log(err);
        return res.render('login', {
          message: 'An error occurred',
          showErrorPopup: true
        });
      }
      console.log(results);

      if (!results || results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
        return res.render('login', {
          message: 'Wrong password or email',
          showErrorPopup: false
        });
      } else {
        const { username, email } = results[0];
        const id = results[0].id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES
        });
       
        const user = {
    
          username: username,
          email: email,
          id: id
        };
        req.session.user = user;

        console.log("the token is " + token);

        const cookieOptions = {
          expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000),
          httpOnly: true
        };
        res.cookie('userSave', token, cookieOptions);
        res.redirect('/account'); // Redirect to the /account route
      }
    });
  } catch (err) {
    console.log(err);
  }
};
