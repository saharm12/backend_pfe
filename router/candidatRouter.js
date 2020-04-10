const express = require('express');
const candidatController = require('../controllers/candidatController');
const verifToken = require('../config/verifToken');
const router = express.Router();


router.get('/getcandidats', verifToken, candidatController.getcandidats)
    //router.put('/acceptcandidat', verifToken, candidatController.acceptcandidat)
router.delete('/deletcandidat/:id', verifToken, candidatController.deletcandidat)
router.put('/refusercandidat', verifToken, candidatController.refusercandidat)
module.exports = router;