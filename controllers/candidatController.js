const conn = require('../config/dbConn');
const config = require('../config/config').secret;


module.exports.getcandidats = (req, res) => {

    conn.query('SELECT * FROM candidat ', (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "candidat": rows });
            console.log("resultat", res)
        }
    });
}