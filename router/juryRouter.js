const express = require('express');
const juryController = require('../controllers/juryController');
const verifToken = require('../config/verifToken');
const router = express.Router();

router.post('/Addjurie', juryController.RegisterJurie);

router.get('/GetJuries', verifToken, juryController.ListJury);
router.delete('/DeleteJuries/:id', verifToken, juryController.Suppjury);




module.exports = router;