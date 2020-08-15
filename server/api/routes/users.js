const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.post('/signup', userController.user_signup);
router.post('/login', userController.user_login);
router.post('/validate', userController.validate_user);

module.exports = router;