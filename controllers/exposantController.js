const bcyrpt = require('bcryptjs');
const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');

module.exports.getexposants = (req, res) => {
    //const id_exposant = req.params.id_exposant
    conn.query('SELECT * FROM exposant ', (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "exposant": rows });
            console.log("resultat", res)
        }
    });
}