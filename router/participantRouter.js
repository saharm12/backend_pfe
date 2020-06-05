const express = require('express');
const participantController = require('../controllers/participantController');
const verifToken = require('../config/verifToken');
const router = express.Router();


router.get('/getparticipants', verifToken, participantController.getparticipants)
router.delete('/deleteparticipant/:id', verifToken, participantController.deleteparticipant)
router.post('/Register', participantController.Addpart);
router.post('/sendqr', participantController.sendQrCode);

module.exports = router;