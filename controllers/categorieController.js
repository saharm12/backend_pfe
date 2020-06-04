const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const emailCtrl = require('./emailController');

module.exports.getcategorie = (req, res) => {

    conn.query('SELECT detail_categorie.critere_selection FROM detail_categorie  INNER JOIN competition ON competiton.nom_categorie=detail_categorie.critere_selection WHERE competition.id_categorie=detail_categorie.id_detail_categorie', (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "categorie": rows });
            console.log("resultat", res)
        }
    });
}
module.exports.addcategorie = (req, res) => {
    const nom_categorie = req.body.nom_categorie;
    const critere_selection = req.body.critere_selection;
    console.log("categorie ", nom_categorie);
    console.log("categorie ", critere_selection);


    conn.query('INSERT INTO `detail_categorie`( `nom_categorie`,`critere_selection`) VALUES (?,?)', [nom_categorie, critere_selection], (err, rows) => {

        if (err) { ////
            console.log(err)
        } else

        {
            console.log('roows', rows);
            res.json({ 'result': rows });
        }
    })
}