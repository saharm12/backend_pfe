const express = require('express');
const exposantController = require('../controllers/exposantController');
const verifToken = require('../config/verifToken');
const router = express.Router();


router.post('/getexposants', exposantController.getexposants)
module.exports = router;