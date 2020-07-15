const express = require('express');
const exposantController = require('../controllers/exposantController');
const verifToken = require('../config/verifToken');
const router = express.Router();


router.get('/getexposants', verifToken, exposantController.getexposants)

router.delete('/deletexposants/:id', verifToken, exposantController.deletexposants)
router.post('/AddExpo', exposantController.addexpo)
router.get('/:id', verifToken, exposantController.getexpoByid);
router.post('/sendqr', exposantController.sendQrCode);
router.post('/checkemailNotTaken', exposantController.CheckEmailNotTaken);
router.post('/checktelNotTaken', exposantController.CheckTelNotTaken);
router.post('/checkmobileNotTaken', exposantController.CheckmobileNotTaken);





module.exports = router;