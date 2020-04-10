const express = require('express');
const juryController = require('../controllers/juryController');
const verifToken = require('../config/verifToken');
const router = express.Router();


// Lien Par defaut .. router permet de recuperer tous les jury
router.get('/', (req, res) => {



});

//  permet au administrateur d'ajouter un jury
router.post('/addjurie', verifToken, juryController.addJurie);
router.put('/update/:id_jury', verifToken, juryController.updateColumn);

//router.post('/prenom',juryController.prenom)

//router.post('/profil',juryController.profil)




// //  permet au administrateur de modifier nom;prenom;profil jury

//router.put('/nom/:id',verifToken,juryController.changenom); 
//router.put('/prenom/:id',verifToken,juryController.changeprenom);
//router.put('/profil/:id',verifToken,juryController.changeprofil); 





module.exports = router;