const express = require('express');
const satisfaction = require('../controllers/satisfactionController');
const router = express.Router();


router.post('/add', satisfaction.addSatisfaction);
router.get('/get', satisfaction.getAllSatisfactions);
router.get('/reviews/:qst/:rep', satisfaction.getAllAResponse);

module.exports = router;