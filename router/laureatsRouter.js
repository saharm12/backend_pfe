const express = require('express');
const laureatsController = require('../controllers/laureatsController');
const verifToken = require('../config/verifToken');
const router = express.Router();
const multer = require('multer')
const path = require('path');





// Lien Par defaut .. router permet de recuperer tous les speakers
router.get('/', (req, res) => {




});



router.post('/ajouter', laureatsController.addLaureatsnew);




router.get('/GetLaureat', verifToken, laureatsController.getlaureat);


module.exports = router;