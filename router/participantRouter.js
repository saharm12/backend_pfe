const express = require('express');
const participantController = require('../controllers/participantController');
const verifToken = require('../config/verifToken');
const router = express.Router();
const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './controllers/pdf')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })



router.get('/getparticipants', verifToken, participantController.getparticipants)
router.delete('/deleteparticipant/:id', verifToken, participantController.deleteparticipant)
router.post('/Register', participantController.Addpart);
router.post('/sendqr', participantController.sendQrCode);
//router.post('/sendAtt', participantController.SendAtt);
router.post('/AddAttestation/:id/:email', upload.single('image'), participantController.AddAttes)

module.exports = router;