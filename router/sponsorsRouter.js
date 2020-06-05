const express = require('express');
const sponsorsController = require('../controllers/sponsorsController');
const verifToken = require('../config/verifToken');
const router = express.Router();
const multer = require('multer');

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
router.get('/getsponsors', verifToken, sponsorsController.getsponsors);
router.delete('/deletesponsors/:id', verifToken, sponsorsController.suppsponsors);
router.post('/ajouter', sponsorsController.addsponsors);
module.exports = router;