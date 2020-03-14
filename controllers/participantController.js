const bcyrpt = require('bcryptjs');
const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');

module.exports.getparticipants = (req, res) => {

    conn.query('SELECT * FROM participant ', (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "particpant": rows });
            console.log("resultat", res)
        }
    });
}