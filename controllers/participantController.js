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

module.exports.deleteparticipant = (req, res) => {
    const id_participant = req.params.id;

    conn.query('DELETE  FROM participant WHERE id_participant= ? ', [id_participant], (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "participant": rows });

        }
    });
}

module.exports.refuserparticipant = (req, res) => {
    const id = req.params.id;

    conn.query(' UPDATE participant SET Etats = "Refuser" WHERE id_participant = id ', [id], (err, rows) => { // les 2 cotes pour la requet SQL , le Tableau est pour les paramatres 

        if (err) {
            console.log(err)
        } else {
            res.json({ 'participant': rows });

        }
    })
}
module.exports.RegisterPart = (req, res) => {
    nom = req.body.nom;
    prenom = req.body.prenom;
    email = req.body.email;
    adresse = req.body.adresse;
    code_postale = req.body.code_postale;
    raison_sociale = req.body.raison_sociale;
    TVA = req.body.TVA;
    Ville = req.body.Ville;
    reserver = req.body.reserver;
    programme = req.body.programme;
    paiement = req.body.paiement;
    num_cheque = req.body.num_cheque;
    conn.query('INSERT INTO `participant`( `nom_participant`, `prenom_participant`, `email_participant`, `adresse`, `code_postale`, raison_sociale, `code_TVA`, `ville`, `nbr-place-reserver`, `choix-programme`, `paiement`, `num-cheque`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [nom, prenom, email, adresse, code_postale, raison_sociale, code_postale, TVA, Ville, reserver, programme, paiement, num_cheque], (err, rows) => {

        if (err) {
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
        }
    })
}