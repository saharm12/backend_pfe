const express = require('express');
const candidatController = require('../controllers/candidatController');
const verifToken = require('../config/verifToken');
const router = express.Router();


router.get('/getcandidats', verifToken, candidatController.getcandidats)
module.exports = router;