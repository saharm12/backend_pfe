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
module.exports.deletexposants = (req, res) => {
    const id_exposant = req.params.id;

    conn.query('DELETE FROM exposant  WHERE id_exposant = ?', [id_exposant], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })
}

module.exports.addexpo = (req, res) => {

    name = req.body.name;
    firstname = req.body.firstname;
    Email = req.body.Email;
    telephone = req.body.telephone;
    raison = req.body.raison;
    adresse = req.body.adresse;
    postale = req.body.postale;
    ville = req.body.ville;
    Pays = req.body.Pays;
    mobile = req.body.mobile;
    TVA = req.body.TVA;
    paiement = req.body.paiement;
    cheque = req.body.cheque;



    conn.query('INSERT INTO `exposant`( `nom_exposant`, `prenom_exposant`, `email_exposant`, `telephone`, `raison_sociale`, `adresse`, `code_postale`, `ville`, `pays`, `Mobile`, `code_TVA`, `paiement`, `cheque`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [name, firstname, Email, telephone, raison, adresse, postale, ville, Pays, mobile, TVA, paiement, cheque], (err, rows) => {

        if (err) {
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
        }
    })


}


module.exports.acceptexposant = (req, res) => {
    const id = req.params.id;

    conn.query(' UPDATE exposant SET Etats = "Accpeter" WHERE id_exposant = id ', [id], (err, rows) => { // les 2 cotes pour la requet SQL , le Tableau est pour les paramatres 

        if (err) {
            console.log(err)
        } else {
            res.json({ 'exposant': rows });

        }
    })

}
module.exports.getexpoByid = (req, res) => {
        const id = req.params.id
        conn.query('SELECT * FROM exposant WHERE id_exposant = ?', [id], (err, rows) => {

            if (err) {
                console.log(err)
            } else {

                res.json({ "exposant": rows })
            }
        });


    }
    //module.exports.refuserexposant = (req, res) => {
    // const id = req.params.id;

// conn.query(' UPDATE exposant SET Etats = "Refuser" WHERE id_exposant = id ', [id], (err, rows) => { // les 2 cotes pour la requet SQL , le Tableau est pour les paramatres 

//   if (err) {
//      console.log(err)
// } else {
//res.json({ 'exposant': rows });

// }
// })

//}