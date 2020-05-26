const express = require('express');
const speakersController = require('../controllers/speakersController');
const verifToken = require('../config/verifToken');
const router = express.Router();
const multer = require('multer')
const path = require('path');
const fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require("rimraf");


// Lien Par defaut .. router permet de recuperer tous les speakers
router.get('/', (req, res) => {




});


router.post('/ajouter', speakersController.addspeaker);
const DIR = './uploads';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            //test if file exist under uploads
            if (fs.existsSync('./uploads/' + file.originalname)) {
                rimraf('./uploads/' + file.originalname, function() {
                    cb(null, DIR);
                });
            } else {
                //si file n'esxiste pas test if uploads exits
                if (fs.existsSync('./uploads')) {
                    cb(null, DIR);
                } else {
                    //si uploads n'existe pas create it
                    mkdirp('./uploads', function(err) {
                        cb(null, DIR);
                    });
                }
            }
        } catch (err) {
            console.error(err)
        }
    },
    filename: (req, file, cb) => {
        //cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
        cb(null, file.originalname);
    }
});


let upload = multer({ storage: storage });
router.post('/upload', verifToken, upload.single('photo'), function(req, res) {
    if (!req.file) {
        return res.send({
            success: false
        });

    } else {
        return res.send({
            success: true
        })
    }
});
router.delete('/DeleteSpeak/:id', verifToken, speakersController.SupprimerSpeakers);



router.get('/Getsp', verifToken, speakersController.getspeaker);
//router.put('/ModifierSpeakers/:id_speakers', verifToken, speakersController.ModifierSpeakers);

router.put('/modifiers/:id_speakers', speakersController.upInfospeak);

// //  permet au administrateur de modifier nom;prenom;profil speakers
//router.put('/nom/:id', verifToken, speakersController.modifnom);
//router.put('/prenom/:id', verifToken, speakersController.changeprenom);
//router.put('/profil/:id', verifToken, speakersController.changeprofil);





module.exports = router;