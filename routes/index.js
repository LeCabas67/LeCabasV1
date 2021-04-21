const express = require('express');
const router = express.Router();

router.use('/account', require('./accounts'));

module.exports = router;
