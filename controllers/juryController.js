const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');

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
    const id_jury = req.params.id_jury;
    const nom_jury = req.body.nom_jury;
    const prenom_jury = req.body.prenom_jury;
    const profil_jury = req.body.profil_jury;
    const pays = req.body.pays;
    conn.query('UPDATE membre_jury SET nom_jury = ?, prenom_jury = ?, profil_jury = ?, pays = ?  WHERE id_jury = ? ', [nom_jury, prenom_jury, profil_jury, pays, id_jury], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })
}