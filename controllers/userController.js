const bcyrpt = require('bcryptjs');
const conn = require('../config/dbConn');
const config = require('../config/config').secret;
const jwt = require('jsonwebtoken');


module.exports.getuserByid = (req, res) => {
    const id = req.params.id
    conn.query('SELECT * FROM user WHERE id_user = ?', [id], (err, rows) => {

        if (err) {
            console.log(err)
        } else {

            res.json({ "user": rows })
        }
    });


}
module.exports.register = (req, res) => {
    name = req.body.name;
    firstname = req.body.firstname;
    psw = req.body.password;
    email = req.body.email;
    type = req.body.type;
    let pass = bcyrpt.hashSync(psw, 10);
    conn.query('SELECT * FROM user WHERE email = ?', [email], (err, rows) => {

        if (err) {
            console.log(err)
        } else if (rows.length != 0) {
            result = { "result": "erreur" }
        } else {

            let pass = bcyrpt.hashSync(psw, 10);
            conn.query('INSERT INTO `user`( `nom`, `prenom`, `email`, `mdp`, `type`) VALUES (?,?,?,?,?)', [name, firstname, email, pass, type], (err, rows) => {

                if (err) {
                    console.log(err)
                } else

                {
                    console.log('roows', rows);
                    res.json({ 'result': rows });
                }
            })
        }
    })

}

module.exports.login = (req, res) => {
    console.log("hello");
    const email = req.body.email;
    const mdp = req.body.mdp;
    conn.query('SELECT * FROM user WHERE email = ? ', [email], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            let value = bcyrpt.compareSync(mdp, rows[0].mdp)
            if (value) {
                let token = jwt.sign({ id: rows[0].id_user }, config, {
                    expiresIn: 86400
                });
                res.json({ 'user': true, 'token': token, 'id': rows[0].id_user });
            } else {
                res.json({ 'user': false });
            }
        }
    })
}


module.exports.changeName = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    conn.query('UPDATE user SET prenom = ? WHERE id_user = ? ', [name, id], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })
}

module.exports.changeLastName = (req, res) => {
    const id = req.params.id;
    const Lastname = req.body.Lastname;
    conn.query('UPDATE user SET nom = ? WHERE id_user = ? ', [Lastname, id], (err, rows) => {

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })
}

module.exports.changepassword = (req, res) => {
    const id = req.params.id;
    const password = req.body.password;
    const hash = bcrypt.hashSync(newpass, saltRound);

    conn.query(' UPDATE user SET mdp = ? WHERE id_user = ? ', [mdp, id], (err, rows) => { // les 2 cotes pour la requet SQL , le Tableau est pour les paramatres 

        if (err) {
            console.log(err)
        } else {
            res.json({ 'result': rows })
        }
    })

}