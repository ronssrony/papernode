const express = require('express');
const authController = require('../controllers/auth')
const router = express.Router();


router.post('/register' , authController.register);
router.post('/login' , authController.login);
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('user'); // Clear the "user" cookie
    res.redirect('/'); // Redirect to the index page
});







module.exports = router ;