const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');

//Ajouter un speakers 
module.exports.addspeaker = (req, res) => {
    imageURL = req.body.imageURL;
    nom_speakers = req.body.nom_speakers;
    prenom_speakers = req.body.prenom_speakers;
    profil_speakers = req.body.profil_speakers;
    pays = req.body.pays;

    conn.query('INSERT INTO `speakers`( `image`, `nom_speakers`, `prenom_speakers`, `profil_speakers`,`pays` ) VALUES (?,?,?,?,?)', [imageURL, nom_speakers, prenom_speakers, profil_speakers, pays], (err, rows) => {

        if (err) {
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
        }
    })
}

//modifier nom speakers
module.exports.modifnom = (req, res) => {
    const id_speakers = req.params.id_speakers;
    const nom_speakers = req.body.nom_speakers;
    conn.query('UPDATE user SET nom_speakers = ? WHERE id_speakers = ? ', [nom_speakers, id_speakers], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })
}

//modifier prenom speakers
module.exports.changeprenom = (req, res) => {
    const id_speakers = req.params.id_speakers;
    const prenom_speakers = req.body.prenom_speakers;
    conn.query('UPDATE user SET prenom_speakers= ? WHERE id_speakers = ? ', [prenom_speakers, id_speakers], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })
}


//modifier profil speakers
module.exports.changeprofil = (req, res) => {
    const id_speakers = req.params.id_speakers;
    const profil_speakers = req.body.profil_speakers;
    conn.query('UPDATE user SET profil_speakers = ? WHERE id_speakers = ? ', [profil_speakers, id_speakers], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })



}

module.exports.getspeaker = (req, res) => {

    conn.query('SELECT * FROM speakers ', (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "speakers": rows });
            console.log("resultat", res)
        }
    });
}
module.exports.getspeakerByid = (req, res) => {
    const id = req.params.id_speakers
    conn.query('SELECT * FROM speakers WHERE id_speakers = ?', [id_speakers], (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "speakers": rows })
        }
    })
}

module.exports.SupprimerSpeakers = (req, res) => {
    const id_speakers = req.params.id;

    conn.query('DELETE FROM speakers  WHERE id_speakers = ?', [id_speakers], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    });

}

module.exports.upInfospeak = (req, res) => {
    console.log("update ", req.body.nom_speakers);
    const imageURL = req.body.imageURL;
    const id_speakers = req.params.id_speakers;
    const nom_speakers = req.body.nom_speakers;
    const prenom_speakers = req.body.prenom_speakers;
    const profil_speakers = req.body.profil_speakers;

    const pays = req.body.pays;

    /*fileURL = req.file.path;
    console.log("file url", fileURL)*/
    conn.query('UPDATE  speakers SET image = ?, nom_speakers = ?, prenom_speakers = ?, profil_speakers = ?, pays = ?  WHERE id_speakers = ? ', [imageURL, nom_speakers, prenom_speakers, profil_speakers, pays, id_speakers], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })
}

module.exports.CheckLinkedInNotTaken = (req, res) => {
    const speakerId = req.params.id_speakers;
    console.log("spekaerId", speakerId)

    conn.query('Select * FROM speakers  WHERE profil_speakers = ?', [req.body.profil_speakers], (err, speakers) => {
        console.log("speaker ddd", speakers.length)
        if (err) {
            console.log("err")
            res.json({
                linkedInNotTaken: true
            })
        } else {
            // No jury with the same linkedIn in the database
            if (speakers.length === 0) {
                return res.json({
                    linkedInNotTaken: true
                });
            }

            // Validate the 'edit jury' form
            if (speakerId) {
                console.log("fffffffffffff", speakers)
                if (speakerId === speakers[0].id_speakers.toString()) {
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