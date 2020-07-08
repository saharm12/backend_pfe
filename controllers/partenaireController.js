const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const emailCtrl = require('./emailController');


module.exports.addpartenaire = (req, res) => {
    imageURL = req.body.imageURL;

    conn.query('INSERT INTO `partenaires`( `image`) VALUES (?)', [imageURL], (err, rows) => {

        if (err) {
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
        }
    })
}
module.exports.getpartenaire = (req, res) => {

    conn.query('SELECT * FROM partenaires ', (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "partenaires": rows });
            console.log("resultat", res)
        }
    });

}
module.exports.supppartenaire = (req, res) => {
    const id_partenaires = req.params.id;

    conn.query('DELETE FROM partenaires  WHERE id_partenaires = ?', [id_partenaires], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    });
}