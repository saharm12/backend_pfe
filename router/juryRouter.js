const express = require('express');
const juryController = require('../controllers/juryController');
const verifToken = require('../config/verifToken');
const router = express.Router();
const multer = require('multer')
const path = require('path');
const fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require("rimraf");


router.get('/', (req, res) => {




});
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

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));*/

/*router.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});*/



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



router.post('/Addjurie', juryController.RegisterJurie);

router.get('/GetJuries', verifToken, juryController.ListJury);
router.delete('/DeleteJuries/:id', verifToken, juryController.Suppjury);
router.put('/modifiersjur/:id_jury', upload.single('userfile'), juryController.UpdateJury);
router.post('/checkLinkedInNotTaken', juryController.CheckLinkedInNotTaken);

module.exports = router;