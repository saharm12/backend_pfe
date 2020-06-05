const bcyrpt = require('bcryptjs');
const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');

module.exports.getdocument = (req, res) => {

    conn.query('SELECT * FROM document ', (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            res.json({ 'document': rows });

        }
    })
}
module.exports.Adddocument = (req, res) => {
    const nom_fichier = req.body.nom_fichier;
    fileURL = req.file.path;
    console.log("My File URL ", fileURL);
    conn.query('INSERT INTO `document`( `fichier`,`nom_fichier`) VALUES (?,?)', [fileURL, nom_fichier], (err, rows) => {

        if (err) { ////
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
        }
    })
}
module.exports.Suppdoc = (req, res) => {
    const id_fichier = req.params.id_fichier;

    conn.query('DELETE FROM document  WHERE id_fichier = ?', [id_fichier], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    });
}