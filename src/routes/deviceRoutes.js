const express = require('express');
const router = express.Router();
const { hexadecimal } = require('../controllers/rastreadorController');

router.post('/parse-hex', hexadecimal);

module.exports = router;
