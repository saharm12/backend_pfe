const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');



module.exports.addLaureatsnew = (req, res) => {
    imageURL = req.body.imageURL;
    categorie = req.body.categorie;




    conn.query('INSERT INTO `laureats`( `image`,`categorie`) VALUES (?,?)', [imageURL, categorie], (err, rows) => {

        if (err) {
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
        }
    })
}
module.exports.getlaureat = (req, res) => {

    conn.query('SELECT * FROM laureats ', (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "laureats": rows });
            console.log("resultat", res)
        }
    });

}
module.exports.Supplau = (req, res) => {
    const id_laureats = req.params.id;

    conn.query('DELETE FROM laureats  WHERE id_laureats = ?', [id_laureats], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    });
}