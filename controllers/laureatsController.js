const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');



module.exports.addLaureatsnew = (req, res) => {
    imageURL = req.body.imageURL;



    conn.query('INSERT INTO `laureats`( `image`) VALUES (?)', [imageURL], (err, rows) => {

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