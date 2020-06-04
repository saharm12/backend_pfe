const express = require('express');
const candidatController = require('../controllers/candidatController');
const verifToken = require('../config/verifToken');
const router = express.Router();
const multer = require('multer');
const PATH = "uploads/";
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
        );
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50,
    }
    //fileFilter: fileFilter, // juste etna7y el file filter w yemchi ettala3 elli et7éb 
});

router.get('/getcandidats', verifToken, candidatController.getcandidats)
    //router.put('/acceptcandidat', verifToken, candidatController.acceptcandidat)
router.delete('/deletcandidat/:id', verifToken, candidatController.deletcandidat)
router.put('/refusercandidat', verifToken, candidatController.refusercandidat);



router.post('/ajouter', candidatController.Addcandidat);

//router.post('/addfile', upload.single('userfile'), candidatController.Addcandidat);
router.post('/addfiles', upload.fields([{ name: 'firstfile', maxCount: 1 }, { name: 'secondfile', maxCount: 1 }]), candidatController.Addcandidat);
router.post('/sendqr', candidatController.sendQrCode);
module.exports = router;