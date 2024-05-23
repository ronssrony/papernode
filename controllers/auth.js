const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12708640",
  password: "5bBub7zfHz",
  database: "sql12708640",
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


exports.submitorder = (req, res) => {
  const {
    orderid,
    phone,
   paper_size,
   color,
   finisher,
   quantity,
   pickup_location,
   userid,
   totalcost,
   finishercost,
   orderdate,
   pickupdate,
   totalpage,
   file_upload,
  } = req.body;
  


  // Store the order in the database
  db.query('INSERT INTO orders SET ?', { orderId:orderid,	phone:phone,paper_size:paper_size,color:color,finisher:finisher,quantity:quantity,userId:userid,pickup_location:pickup_location,totalcost:totalcost,finisher_cost:finishercost,order_date:orderdate,pickup_date:pickupdate,totalpage:totalpage,file:file_upload}, (error ,result) => {
    if (error) {
      console.log(error);
    } else {  
      console.log(result) ;
      
      return res.render('payment', { orderid,
        phone,
       paper_size,
       color,
       finisher,
       quantity,
       pickup_location,
       userid,
       totalcost,
       finishercost,
       orderdate,
       pickupdate,
       totalpage,
       file_upload,
      });
    }
  });
};

exports.uploadProfileImage = (req, res) => {
  if (!req.files) {
 
    res.redirect('/account');
  }

  const { userid } = req.body;
  const { username } = req.body;
  const { email } = req.body;
  const { phone } = req.body;
  const file = req.files.profileImage;
  const profileImage = file.name;
  if (!userid) {
    console.log(userid); 
    return res.status(400).send('User ID is required');
  }
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    file.mv('public/image/uploaded_images/'+profileImage, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      
      const sql = 'UPDATE user SET username = ?, email = ?, phone = ?, profile_image = ? WHERE id = ?';

      db.query(sql, [username, email, phone, profileImage, parseInt(userid)], (error, results) => {
        console.log(results)
        if (error) {
          console.log(error);
          return res.status(500).send('An error occurred while updating the profile image.');
        }

        res.render('account', { username, email , userid , profileImage , phone });
      });
    });
  } else {
    return res.status(400).send('Invalid file format. Please upload an image in JPEG, PNG, or GIF format.');
  }
};
exports.carrer= (req, res) => {

  console.log(req.body);

  const { agent_name,first_name,last_name, email,campus_name,agent_address, password } = req.body;
  let campus_id ;
   
   if(campus_name === 'Bsmrstu' || campus_name === 'Bangabondhu Sheikh Mujibar Rahman Science And Technology University' || campus_name ==='bsmrstu')
   {
       campus_id  = 1 ;

   }
   else 
   {
    campus_id  = 2 ;
   }
  db.query('SELECT email FROM agents WHERE email = ?', [email], async (error, results) => {
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

    db.query('INSERT INTO agents SET ?', { agent_name: agent_name,first_name:first_name,last_name:last_name, email: email,campus_name:campus_name,campus_id:campus_id,agent_address:agent_address, password:hashedPassword }, (error, results) => {
      if (error) {
        console.log(error);
      }
       else {  
        return res.render('carrerlogin', {
          message: 'User registered',
          showErrorPopup:false
        });
      }
    });
  });
 
};


exports.carrerlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    db.query('SELECT * FROM agents WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.log(err);
        return res.render('/carrerlogin', {
          message: 'An error occurred',
          showErrorPopup: true
        });
      }
      console.log(results);

      if (!results || results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
        return res.render('/carrerlogin', {
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
        res.redirect('/agent'); // Redirect to the /account route
      }
    });
  } catch (err) {
    console.log(err);
  }
};


exports.payment = (req, res) => {

  console.log(req.body);

  const { totalcost} = req.body;
  
  const data = {
    total_amount: totalcost,
    currency: 'BDT',
    tran_id: 'REF123',
    success_url: `${process.env.ROOT}/ssl-payment-success`,
    fail_url: `${process.env.ROOT}/ssl-payment-fail`,
    cancel_url: `${process.env.ROOT}/ssl-payment-cancel`,
    shipping_method: 'No',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'cust@yahoo.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    multi_card_name: 'mastercard',
    value_a: 'ref001_A',
    value_b: 'ref002_B',
    value_c: 'ref003_C',
    value_d: 'ref004_D',
    ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
  };

  const sslcommerz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false) //true for live default false for sandbox
  sslcommerz.init(data).then(data => {

    //process the response that got from sslcommerz 
    //https://developer.sslcommerz.com/doc/v4/#returned-parameters

    if (data?.GatewayPageURL) {
      return res.status(200).redirect(data?.GatewayPageURL);
    }
    else {
      return res.status(400).json({
        message: "Session was not successful"
      });
    }
  });



  
};
