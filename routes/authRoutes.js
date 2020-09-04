const express = require('express');
const authControllers = require('../controllers/authControllers');

const { signupUser, signinUser } = authControllers;

const router = express.Router();
router.post('/signup', signupUser);
router.post('/signin', signinUser);

module.exports = router;
