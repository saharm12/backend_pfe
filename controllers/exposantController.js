const bcyrpt = require('bcryptjs');
const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');
const emailCtrl = require('./emailController');

const Pusher = require('pusher');
const pusher = new Pusher({
    appId: "1012934",
    key: "ed4a857e8e6c3f7716b0",
    secret: "45f29b84a409f7cee457",
    cluster: "eu"
})

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

    const name = req.body.name;
    const firstname = req.body.firstname;
    const Email = req.body.Email;
    const telephone = req.body.telephone;
    const raison = req.body.raison;
    const adresse = req.body.adresse;
    const postale = req.body.postale;
    const ville = req.body.ville;
    const Pays = req.body.Pays;
    const mobile = req.body.mobile;
    const TVA = req.body.TVA;
    const paiement = req.body.paiement;
    const cheque = req.body.cheque;



    conn.query('INSERT INTO `exposant`( `nom_exposant`, `prenom_exposant`, `email_exposant`, `telephone`, `raison_sociale`, `adresse`, `code_postale`, `ville`, `pays`, `Mobile`, `code_TVA`, `paiement`, `cheque`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [name, firstname, Email, telephone, raison, adresse, postale, ville, Pays, mobile, TVA, paiement, cheque], (err, rows) => {

        if (err) {
            console.log(err)
        } else

        {

            pusher.trigger('exposant', 'inscription', { "message": "l' exposant" + "  " + name + firstname + " à effetctuté sa inscription avec succées" });
            console.log('roows', rows);
            // res.json({ 'result': rows });
            let myEmail = {
                'receiver': req.body.Email,
                'subject': 'Success',
                'emailText': 'Monsieur/Madame en vous informe que votre réservation est bien été effectué dont il est inclu (1500dt):le  Frais de location , Ce prix comprend l’accès de deux personnes- Aux conférences et ateliers du 4/5 Décembre- 2 déjeuner et 2 pauses-cafés -toute la documentation -Attestation de Participation. Aussi NB : Vous ramenez votre propre stand (nu) 3mx2m.Si vous avez choisir le paiement par virement voici notre Numéro de Compte : MF : 1382624/HAM000 _ RIB : 10308079105170078870 STB SOUSSE TROCADERO .NB : Ce contrat est considéré comme étant un BC ( Toute annulation ne sera acceptée que 15 jours avant le TUNISIA DIGITAL AWARDS , dans le cas contraire il impératif de payer tout le montant du BC ). Nous vous prions de bien vouloir télécharger la fiche de réservation espace exposition et de nous la retourner avec le cachet de votre société sur : contact@digital-awards.org  '
            }
            emailCtrl.sendEmail(myEmail);
            res.json({
                'msg': 'Email  a été envoyé '
            })
            console.log('roows', rows);
            //res.json({ 'result': rows });
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
module.exports.sendQrCode = (req, res) => {

    console.log("sql : ", 'UPDATE exposant SET qrcode = 1  WHERE id_exposant=' + req.body.id)
    conn.query('UPDATE exposant SET qrcode = 1  WHERE id_exposant=' + req.body.id, (err, rows) => { // les 2 cotes pour la requet SQL , le Tableau est pour les paramatres 

        if (err) {
            console.log(err)
        } else {
            // res.json({ 'participant': rows });

        }
    })

    let myEmail = {
        'receiver': req.body.Email,
        'userid': req.body.id,
        'subject': 'Success',
        'emailText': 'Voici votre code QR .Merci',
        'userInfo': req.body.info
    }
    emailCtrl.sendQrCode(myEmail);
    res.json({
        'msg': 'QR code a été envoyé '
    })
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