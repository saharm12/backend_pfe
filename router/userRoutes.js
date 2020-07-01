const express = require('express');
const userController = require('../controllers/userController');
const verifToken = require('../config/verifToken');
const router = express.Router();


// Lien Par defaut .. router permet de recuperer tous les utlisateurs
router.get('/', (req, res) => {



});

// Lien de la fonction qui permet à l'inscrption d'un utilisateur 
router.post('/register', userController.register)

router.post('/login', userController.login);
router.get('/:id', verifToken, userController.getuserByid);

// Permet à l'utilisateur de modifier son prenom 
router.put('/firstname/:id', verifToken, userController.changeName);



// Permet à l'utilisateur de modifier son lastname 
router.put('/lastname/:id', verifToken, userController.changeLastName);


// Permet à l'utilisateur de modifier son mot de passe  
router.put('/password/:id', verifToken, userController.changepassword);
router.post('/checkEmailNotTaken', userController.checkEmailNotTaken)
module.exports = router;