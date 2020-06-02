const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const emailCtrl = require('./emailController');

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
    fileURL = req.file.path;
    const ste = req.body.ste;
    const respon = req.body.respon;
    const adresse = req.body.adresse;
    const codepostale = req.body.codepostale;
    const GSM = req.body.GSM;
    const siteweb = req.body.siteweb;
    const client = req.body.client;
    const categorie = req.body.categorie;
    const dossier_candidature = req.body.dossier_candidature;
    autre_piece = req.file.autre_piece;
    const candidatEmail = req.body.candidatEmail;

    console.log(ste);
    console.log("My File URL ", fileURL);
    conn.query('INSERT INTO `candidat`( `nom_societe_agence`,`personne_responsable_candidature`,`adresse`,`code_postale`,`email`,`GSM`,site_web,`client_fournisseur`,`categorie`,`dossier_candidature`) VALUES (?,?,?,?,?,?,?,?,?,?)', [ste, respon, adresse, codepostale, candidatEmail, GSM, siteweb, client, categorie, fileURL], (err, rows) => {

        if (err) { ////
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
            let myEmail = {
                'receiver': req.body.candidatEmail,
                'subject': 'Success',
                'emailText': 'Bonjour Mr/Mme votre candidature a bien été enregistrer  en vous informe que le frais de candidature 300dt(150dt/catégorie+150dt Diner Soirée[TVA 19%] , toute annulation ne serait acceptée qu’avant le 25 Novembre 2019, dans cas contraire il est impératif de payer tout le montant du BC) et  nous vous prions de bien vouloir remplir le bon de commande et l’envoyer par E-mail sur : Contact@digital-awards.org .Merci pour votre participation.   '
            }
            emailCtrl.sendEmail(myEmail);
        }
    })


}

module.exports.sendQrCode = (req, res) => {

    let myEmail = {
        'receiver': req.body.candidatEmail,
        'userid': req.body.id,
        'subject': 'Success',
        'emailText': 'Votre dsipostion de dossier est en cours de traitment .merci',
        'userInfo': req.body.info
    }
    emailCtrl.sendQrCode(myEmail);
}