const express = require('express');
const mysql = require('mysql') ;
const router = express.Router();



const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12708640",
  password: "5bBub7zfHz",
  database: "sql12708640",
});

router.get('/' ,(req, res) => {
    res.render('index'); 

});

router.get('/register' ,(req, res) => {
    res.render('register'); 

});
router.get('/pdftoword' ,(req, res) => {
    res.render('pdftoword'); 

});
router.get('/login' ,(req, res) => {
    res.render('login'); 

});
router.get('/account', (req, res) => {
    const { id,username, email } = req.session.user || {};

    db.query('SELECT * FROM user WHERE id = ?', [id], (error, results) => {

        if (error) {
          console.log(error);
          // Handle the error appropriately
        } else {
          const user = results[0];
          const profileImage = user.profile_image; 
          const phone = user.phone ;       
          res.render('account', { username, email ,id, profileImage,phone });
        }
      });
});
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/'); 
  });
router.get('/order', (req, res) => {
  const { id,username, email } = req.session.user || {};
  db.query('SELECT * FROM `agents` WHERE campus_id = ?', [1], (error, results) => {
    if (error) {
      console.log(error);
      // Handle the error appropriately
    } else {
      const campusname = results; // Assign the results to the 'orders' variable

      res.render('order', { username, email, id, campusname });
    }
  });
  });
 
  
router.get('/settings' ,(req, res) => {
  const { id,username, email } = req.session.user || {};
    
    db.query('SELECT * FROM user WHERE id = ?', [id], (error, results) => {
      
        if (error) {
          console.log(error);
          // Handle the error appropriately
        } else {
          const user = results[0];
          const imageData = user.profile_image;
          const base64Image = Buffer.from(imageData).toString('base64');
          const dataURL = `data:image/jpeg;base64,${base64Image}`;
          
          res.render('settings', { username, email ,id,dataURL,user });
        }
      });

});
router.get('/history', (req, res) => {
  const { id, username, email } = req.session.user || {};

  db.query('SELECT * FROM `orders` WHERE userId = ?', [id], (error, results) => {
    if (error) {
      console.log(error);
      // Handle the error appropriately
    } else {
      const orders = results; // Assign the results to the 'orders' variable

      res.render('history', { username, email, id, orders });
    }
  });
});
router.get('/carrer',(req,res) => {
   
  res.render('carrer')
});
router.get('/carrerlogin',(req,res)=>
{
  res.render('carrerlogin')
}); 

router.get('/agent', (req, res) => {
  const countOrdersQuery = 'SELECT COUNT(*) AS totalOrders FROM orders';
  const ordersQuery = 'SELECT * FROM orders';
  const sumQuery = 'SELECT SUM(totalcost) AS totalCost FROM orders';

  db.query(countOrdersQuery, (countOrdersError, countOrdersResults) => {
    if (countOrdersError) {
      console.log(countOrdersError);
      // Handle the error appropriately
    } else {
      const totalOrders = countOrdersResults[0].totalOrders;

      db.query(ordersQuery, (ordersError, ordersResults) => {
        if (ordersError) {
          console.log(ordersError);
          // Handle the error appropriately
        } else {
          const orders = ordersResults;

          db.query(sumQuery, (sumError, sumResults) => {
            if (sumError) {
              console.log(sumError);
              // Handle the error appropriately
            } else {
              const totalCost = sumResults[0].totalCost;
              const seventyFivePercentTotalCost = (0.75 * totalCost).toFixed(3);
               let seventyFivePercent ;
              orders.forEach(order => {
                order.seventyFivePercent = (0.75 * order.totalcost).toFixed(3);
              });

              res.render('agent', { totalOrders, orders, totalCost, seventyFivePercentTotalCost ,seventyFivePercent });
            }
          });
        }
      });
    }
  });
});



router.get('/admin', (req, res) => {
  const countOrdersQuery = 'SELECT COUNT(*) AS totalOrders FROM orders';
  const countUsersQuery = 'SELECT COUNT(*) AS totalUsers FROM user';
  const countAgentsQuery = 'SELECT COUNT(*) AS totalAgents FROM agents';
  const ordersQuery = 'SELECT * FROM orders';
  const sumQuery = 'SELECT SUM(totalcost) AS totalCost FROM orders';
  const usersQuery = 'SELECT * FROM user';
  const agentsQuery = 'SELECT * FROM agents';

  db.query(countOrdersQuery, (countOrdersError, countOrdersResults) => {
    if (countOrdersError) {
      console.log(countOrdersError);
      // Handle the error appropriately
    } else {
      const totalOrders = countOrdersResults[0].totalOrders;

      db.query(countUsersQuery, (countUsersError, countUsersResults) => {
        if (countUsersError) {
          console.log(countUsersError);
          // Handle the error appropriately
        } else {
          const totalUsers = countUsersResults[0].totalUsers;

          db.query(ordersQuery, (ordersError, ordersResults) => {
            if (ordersError) {
              console.log(ordersError);
              // Handle the error appropriately
            } else {
              const orders = ordersResults;
              let fifteenPercent;
              orders.forEach(order => {
                order.fifteenPercent = ((15 / 100) * order.totalcost).toFixed(3);
              });
              db.query(sumQuery, (sumError, sumResults) => {
                if (sumError) {
                  console.log(sumError);
                  // Handle the error appropriately
                } else {
                  const totalCost = sumResults[0].totalCost;
                  const totalfifteen = totalCost * 0.15;

                  db.query(usersQuery, (usersError, usersResults) => {
                    if (usersError) {
                      console.log(usersError);
                      // Handle the error appropriately
                    } else {
                      const users = usersResults;

                      db.query(agentsQuery, (agentsError, agentsResults) => {
                        if (agentsError) {
                          console.log(agentsError);
                          // Handle the error appropriately
                        } else {
                          const agents = agentsResults;

                          db.query(countAgentsQuery, (countAgentsError, countAgentsResults) => {
                            if (countAgentsError) {
                              console.log(countAgentsError);
                              // Handle the error appropriately
                            } else {
                              const totalAgents = countAgentsResults[0].totalAgents;
                              res.render('admin', { totalOrders, totalUsers, orders, totalCost, users, agents, fifteenPercent, totalfifteen, totalAgents });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});





module.exports = router ;
