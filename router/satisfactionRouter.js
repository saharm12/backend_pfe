const express = require('express');
const satisfaction = require('../controllers/satisfactionController');
const router = express.Router();


router.post('/add', satisfaction.addSatisfaction);
router.get('/get', satisfaction.getAllSatisfactions);
router.get('/reviews/:qst/:rep', satisfaction.getAllAResponse);
router.get('/reviews1A/:qst/:rep', satisfaction.getResponse1A);
router.get('/reviews1B/:qst/:rep', satisfaction.getResponse1B);
router.get('/reviews1C/:qst/:rep', satisfaction.getResponse1C);
router.get('/reviews2A/:qst/:rep', satisfaction.getResponse2A);
router.get('/reviews2B/:qst/:rep', satisfaction.getResponse2B);
router.get('/reviews2C/:qst/:rep', satisfaction.getResponse2C);
router.get('/reviews3A/:qst/:rep', satisfaction.getResponse3A);
router.get('/reviews3B/:qst/:rep', satisfaction.getResponse3B);
router.get('/reviews3C/:qst/:rep', satisfaction.getResponse3C);
router.get('/reviews4A/:qst/:rep', satisfaction.getResponse4A);
router.get('/reviews4B/:qst/:rep', satisfaction.getResponse4B);
router.get('/reviews4C/:qst/:rep', satisfaction.getResponse4C);
module.exports = router;