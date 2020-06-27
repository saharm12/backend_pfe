const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const emailCtrl = require('./emailController');
const Pusher = require('pusher');
const pusher = new Pusher({
    appId: "1012934",
    key: "ed4a857e8e6c3f7716b0",
    secret: "45f29b84a409f7cee457",
    cluster: "eu"
})

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
    fileURL = req.files['firstfile'][0].path;
    const secondfile = req.files['secondfile'][0].path;
    console.log(secondfile);
    const ste = req.body.ste;
    const respon = req.body.respon;
    const adresse = req.body.adresse;
    const codepostale = req.body.codepostale;
    const GSM = req.body.GSM;
    const siteweb = req.body.siteweb;
    const client = req.body.client;
    const categorie = req.body.categorie;
    const dossier_candidature = req.body.dossier_candidature;
    //autre_piece = req.file.autre_piece;
    const candidatEmail = req.body.candidatEmail;
    console.log(ste);
    console.log("My File URL ", fileURL);
    conn.query('INSERT INTO `candidat`( `nom_societe_agence`,`personne_responsable_candidature`,`adresse`,`code_postale`,`email`,`GSM`,site_web,`client_fournisseur`,`categorie`,`dossier_candidature`,`autre_pieces`) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [ste, respon, adresse, codepostale, candidatEmail, GSM, siteweb, client, categorie, fileURL, secondfile], (err, rows) => {

        if (err) { ////
            console.log(err)
        } else

        {
            pusher.trigger('candidat', 'inscription', { "message": " Le candidat  " + ":" + respon + " à effetctuté sa inscription avec succées" });
            console.log('roows', rows);
            // res.json({ 'result': rows });
            let myEmail = {
                'receiver': req.body.candidatEmail,
                'subject': 'Success',
                'emailText': 'Bonjour Mr/Mme votre candidature a bien été enregistrer  en vous informe que le frais de candidature 300dt(150dt/catégorie+150dt Diner Soirée[TVA 19%] , toute annulation ne serait acceptée qu’avant le 25 Novembre 2019, dans cas contraire il est impératif de payer tout le montant du BC) et  nous vous prions de bien vouloir remplir le bon de commande et l’envoyer par E-mail sur : Contact@digital-awards.org .Merci pour votre participation.   '
            }
            emailCtrl.sendEmail(myEmail);
            res.json({
                'msg': 'Email  a été envoyé '
            })
        }
    })


}

module.exports.sendQrCode = (req, res) => {

    let myEmail = {
        'receiver': req.body.candidatEmail,
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