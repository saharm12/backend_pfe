const express = require('express');
const speakersController = require('../controllers/speakersController');
const verifToken = require('../config/verifToken');
const router = express.Router();


// Lien Par defaut .. router permet de recuperer tous les speakers
router.get('/', (req, res) => {




});


router.post('/addspeaker', speakersController.addspeaker);
router.delete('/DeleteSpeak/:id', verifToken, speakersController.SupprimerSpeakers);



router.get('/Getsp', verifToken, speakersController.getspeaker);
//router.put('/ModifierSpeakers/:id_speakers', verifToken, speakersController.ModifierSpeakers);

router.put('/modifiers/:id_speakers', speakersController.upInfospeak);

// //  permet au administrateur de modifier nom;prenom;profil speakers
//router.put('/nom/:id', verifToken, speakersController.modifnom);
//router.put('/prenom/:id', verifToken, speakersController.changeprenom);
//router.put('/profil/:id', verifToken, speakersController.changeprofil);





module.exports = router;