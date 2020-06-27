const bcyrpt = require('bcryptjs');
const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');
const multer = require('multer');


const emailCtrl = require('./emailController');

const Pusher = require('pusher');
const pusher = new Pusher({
    appId: "1012934",
    key: "ed4a857e8e6c3f7716b0",
    secret: "45f29b84a409f7cee457",
    cluster: "eu"
})


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
module.exports.AddAttes = (req, res) => {
    const id = req.params.id
    const email = req.params.email;
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    console.log({

        to: email, // list of receivers
        subject: "Attestation", // Subject line
        text: "Attestation de presence", // plain text body

    })

    console.log("UPDATE  `participant` SET `attestation`='" +
        file.originalname + "'  WHERE id =" + id)
    conn.query("UPDATE  `participant` SET `attestation`='" +
        file.originalname + "'  WHERE id_participant =" + id, [], (err, rows) => {
            console.log("file")

            // if (err) {
            //     console.log(err)
            // } else {

            // emailCtrl.sendEmail({
            //  to: "moussa.sahar0@gmail.com", // list of receivers
            //   from: "moussa.sahar0@gmail.com",
            //  subject: 'Attestation', // Subject line
            //  text: 'Attestation de presence', // plain text body

            // })
            // }
            let myEmail = {
                'receiver': req.params.email,
                'subject': 'Success',
                'emailText': 'Attestation de presence',
                'filename': file.originalname
            }
            emailCtrl.sendEmail(myEmail);
            res.json({
                'msg': 'Email  a été envoyé '
            })

        })





    // res.send(file)



}
module.exports.Addpart = (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const adresse = req.body.adresse;
    const code_postale = req.body.code_postale;
    const raison_sociale = req.body.raison_sociale;
    const TVA = req.body.TVA;
    const Ville = req.body.Ville;
    const reserver = req.body.reserver;
    const programme = req.body.programme;
    const paiement = req.body.paiement;
    const num_cheque = req.body.num_cheque;
    const type_participant = req.body.type_participant
    conn.query('INSERT INTO `participant`(`nom_participant`, `prenom_participant`, `email_participant`, `adresse`, `code_postale`, `raison_sociale`, `code_TVA`, `ville`, `nbr_place_reserver`, `choix_programme`,  `type_participant`, `paiement`, `num_cheque`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [nom, prenom, email, adresse, code_postale, raison_sociale, TVA, Ville, reserver, programme, type_participant, paiement, num_cheque], (err, rows) => {

        if (err) {
            console.log(err)
        } else

        {
            pusher.trigger('participant', 'inscription', { "message": "Le participant" + "  " + nom + prenom + " à effetctuté sa inscription avec succées" });
            console.log('roows', rows);
            // res.json({ 'result': rows });
            let myEmail = {
                'receiver': req.body.email,
                'subject': 'Success',
                'emailText': 'Monsieur/Madame en vous informe que votre participation  est bien été effectué  . Voici notre numéro de compte: MF : 1382624/HAM000 _ RIB : 10308079105170078870  si vous avez choisie le paiement par virement'
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
module.exports.sendQrCode = (req, res) => {

    let myEmail = {
        'receiver': req.body.email,
        'userid': req.body.id,
        'subject': 'Success',
        'emailText': 'Voici votre code QR  .Merci',
        'userInfo': req.body.info
    }
    emailCtrl.sendQrCode(myEmail);
    res.json({
        'msg': 'QR code a été envoyé '
    })

}