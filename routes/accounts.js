const express = require('express');
const router = express.Router();
const {signin, signup, forgot, reset, resetPassword} = require('@libs/controllers/accounts');

router.post('/signin', signin);

router.post('/signup', signup);

router.post('/forgot', forgot);

router.get('/reset/:token', reset);

router.post('/reset/:token', resetPassword);

module.exports = router;
