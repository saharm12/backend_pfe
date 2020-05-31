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

module.exports.acceptcandidat = (req, res) => {
    const id = req.params.id;

    conn.query(' UPDATE candidat SET Etats = "Accepter" WHERE id_candidat = id ', [id], (err, rows) => { // les 2 cotes pour la requet SQL , le Tableau est pour les paramatres 

        if (err) {
            console.log(err)
        } else {
            res.json({ 'candidat': rows });

        }
    })

}

module.exports.refusercandidat = (req, res) => {
    const id = req.params.id;

    conn.query(' UPDATE candidat SET Etats = "Refuser" WHERE id_candidat = id ', [id], (err, rows) => { // les 2 cotes pour la requet SQL , le Tableau est pour les paramatres 

        if (err) {
            console.log(err)
        } else {
            res.json({ 'candidat': rows });

        }
    })

}

module.exports.deletcandidat = (req, res) => {
    const id_candidat = req.params.id;

    conn.query('DELETE FROM candidat  WHERE id_candidat = ?', [id_candidat], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })
}
module.exports.Addcandidat = (req, res) => {
    fileURL = req.body.fileURL;

    conn.query('INSERT INTO `candidat` (`dossier_candidature`) VALUES (?)', [fileURL], (err, rows) => {

        if (err) {
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
        }
    })


}