const express = require('express');
const documentController = require('../controllers/documentController');
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
    // limits: {
    //     fileSize: 1024 * 1024 * 5,
    // }, lpost l3adiya 
    //fileFilter: fileFilter, // juste etna7y el file filter w yemchi ettala3 elli et7éb 
});

router.get('/getdoc', verifToken, documentController.getdocument);
router.post('/addfile', upload.single('userfile'), documentController.Adddocument);
router.delete('/deletedoc/:id_fichier', verifToken, documentController.Suppdoc);

module.exports = router;