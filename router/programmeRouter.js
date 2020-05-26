const express = require('express');
const programmeController = require('../controllers/programmeController');

const verifToken = require('../config/verifToken');
const router = express.Router();

router.get('/getprog', verifToken, programmeController.getprogramme);
router.post('/ajouterProg', programmeController.addProg);

module.exports = router;