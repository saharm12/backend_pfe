const express = require('express');
const programmeController = require('../controllers/programmeController');

const verifToken = require('../config/verifToken');
const router = express.Router();

router.get('/getprog', verifToken, programmeController.getprogramme);
router.post('/ajouterProg', programmeController.addProg);
router.get('/GetprogByid/:id', verifToken, programmeController.getprogByid);
router.delete('/supprog/:id', verifToken, programmeController.supprog);
router.put('/updateprogramme/:id_programme', verifToken, programmeController.update);
module.exports = router;