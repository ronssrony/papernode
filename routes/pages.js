const express = require('express');

const router = express.Router();

router.get('/' ,(req, res) => {
    res.render('index'); 

});

router.get('/register' ,(req, res) => {
    res.render('register'); 

});
router.get('/login' ,(req, res) => {
    res.render('login'); 

});
router.get('/account', (req, res) => {
    const { id,username, email } = req.session.user;
    res.render('account', { username, email ,id });
});
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/'); 
  });
router.get('/order', (req, res) => {
   const { id,username, email } = req.session.user;
   res.render('order', { username, email ,id });
  });

  router.get('/payment' ,(req, res) => {
    const { id,username, email } = req.session.user;
   res.render('payment', { username, email ,id });

});

module.exports = router ;