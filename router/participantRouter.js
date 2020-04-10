const express = require('express');
const participantController = require('../controllers/participantController');
const verifToken = require('../config/verifToken');
const router = express.Router();


router.get('/getparticipants', verifToken, participantController.getparticipants)
router.delete('/deleteparticipant/:id', verifToken, participantController.deleteparticipant)
router.post('/AddPart', participantController.RegisterPart)


module.exports = router;