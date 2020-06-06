const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const emailCtrl = require('./emailController');


module.exports.addsponsors = (req, res) => {
    imageURL = req.body.imageURL;

    conn.query('INSERT INTO `sponsors`( `image`) VALUES (?)', [imageURL], (err, rows) => {

        if (err) {
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
        }
    })
}
module.exports.getsponsors = (req, res) => {

    conn.query('SELECT * FROM sponsors ', (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "sponsors": rows });
            console.log("resultat", res)
        }
    });

}
module.exports.suppsponsors = (req, res) => {
    const id_sponsors = req.params.id;

    conn.query('DELETE FROM sponsors  WHERE id_sponsors= ?', [id_sponsors], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    });
}