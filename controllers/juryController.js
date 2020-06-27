const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');

// Check if there is a jury with the same linkedIn in the database

module.exports.CheckLinkedInNotTaken = (req, res) => {
    const juryId = req.body.id_jury;
    console.log("juryId", juryId)

    conn.query('Select * FROM membre_jury  WHERE profil_jury = ?', [req.body.profil_jury], (err, jury) => {
        console.log("jury ddd", jury.length)
        if (err) {
            console.log("err")
            res.json({
                linkedInNotTaken: true
            })
        } else {
            // No jury with the same linkedIn in the database
            if (jury.length === 0) {
                return res.json({
                    linkedInNotTaken: true
                });
            }

            // Validate the 'edit jury' form
            if (juryId) {
                if (juryId === jury.id_jury.toString()) {
                    return res.json({
                        linkedInNotTaken: true
                    })
                } else {
                    return res.json({
                        linkedInNotTaken: false
                    })
                }
            }

            // Validate the 'create jury' form
            else {
                res.json({
                    linkedInNotTaken: false
                })
            }
        }
    })
}

//Ajouter un jury 
module.exports.RegisterJurie = (req, res) => {
    imageURL = req.body.imageURL;
    nom_jury = req.body.nom_jury;
    prenom_jury = req.body.prenom_jury;
    profil_jury = req.body.profil_jury;
    pays = req.body.pays;


    conn.query('INSERT INTO `membre_jury`(`image`, `nom_jury`, `prenom_jury`, `profil_jury`,`pays` ) VALUES (?,?,?,?,?)', [imageURL, nom_jury, prenom_jury, profil_jury, pays], (err, rows) => {

        if (err) {
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
        }
    })
}

module.exports.ListJury = (req, res) => {
    conn.query('SELECT * FROM membre_jury ', (err, rows) => {
        if (err) {
            console.log(err)
        } else {

            res.json({ "membre_jury": rows });
            console.log("resultat", res)
        }
    });

}
module.exports.Suppjury = (req, res) => {
    const id_jury = req.params.id;

    conn.query('DELETE FROM membre_jury  WHERE id_jury = ?', [id_jury], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    });
}
module.exports.UpdateJury = (req, res) => {
    console.log("update ", req.body.nom_jury);
    const imageURL = req.body.imageURL;
    const id_jury = req.params.id_jury;
    const nom_jury = req.body.nom_jury;
    const prenom_jury = req.body.prenom_jury;
    const profil_jury = req.body.profil_jury;
    const pays = req.body.pays;
    conn.query('UPDATE membre_jury SET image = ?, nom_jury = ?, prenom_jury = ?, profil_jury = ?, pays = ?  WHERE id_jury = ? ', [imageURL, nom_jury, prenom_jury, profil_jury, pays, id_jury], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })
}