const express = require('express');
const exposantController = require('../controllers/exposantController');
const verifToken = require('../config/verifToken');
const router = express.Router();


router.get('/getexposants', verifToken, exposantController.getexposants)

router.delete('/deletexposants/:id', verifToken, exposantController.deletexposants)
router.post('/AddExpo', exposantController.addexpo)





module.exports = router;