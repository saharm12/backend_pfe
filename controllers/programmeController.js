const bcyrpt = require('bcryptjs');
const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');

module.exports.getprogramme = (req, res) => {
    //const id_exposant = req.params.id_exposant
    conn.query('SELECT * FROM programme ', (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "programme": rows });
            console.log("resultat", res)
        }
    });
}
module.exports.getprogByid = (req, res) => {
    const id = req.params.id
    conn.query('SELECT * FROM programme WHERE id_programme = ?', [id], (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "programme": rows })
        }
    });
}
module.exports.addProg = (req, res) => {


    details_programme = req.body.details_programme;
    conn.query('INSERT INTO `programme`(  `details_programme`) VALUES (?)', [details_programme], (err, rows) => {

        if (err) {
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
        }
    });



}
module.exports.supprog = (req, res) => {
    const id_programme = req.params.id;

    conn.query('DELETE FROM programme  WHERE id_programme= ?', [id_programme], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    });
}
module.exports.update = (req, res) => {
    const id_programme = req.params.id_programme;

    const details_programme = req.body.details_programme;
    conn.query('UPDATE  programme SET  details_programme = ?  WHERE id_programme = ? ', [details_programme, id_programme], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })
}