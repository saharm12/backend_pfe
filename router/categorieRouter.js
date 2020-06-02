const express = require('express');
const categorieController = require('../controllers/categorieController');
const verifToken = require('../config/verifToken');
const router = express.Router();

router.post('/ajouter', categorieController.addcategorie);
router.get('/getcategorie', verifToken, categorieController.getcategorie);
module.exports = router;