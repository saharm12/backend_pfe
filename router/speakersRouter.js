const express = require('express');
const speakersController = require('../controllers/speakersController');
const verifToken = require('../config/verifToken');
const router = express.Router();


// Lien Par defaut .. router permet de recuperer tous les speakers
router.get('/', (req, res) => {




});

//  permet au administrateur d'ajouter un speakers
router.post('/addspeaker', speakersController.addspeaker);



router.get('/:id', verifToken, speakersController.getspeakerByid);

// //  permet au administrateur de modifier nom;prenom;profil speakers

router.put('/nom/:id', verifToken, speakersController.modifnom);
router.put('/prenom/:id', verifToken, speakersController.changeprenom);
router.put('/profil/:id', verifToken, speakersController.changeprofil);





module.exports = router;