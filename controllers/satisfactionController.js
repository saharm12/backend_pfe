const conn = require('../config/dbConn');
const config = require('../config/config').secret;
module.exports.addSatisfaction = (req, res) => {
    const sql = "INSERT INTO `enquete_satisfaction`( `numQuestion`, `Rep`, `id_user`) VALUES (?,?,?)"
    const userResp = req.body.userResp;
    const id_user = req.body.id;
    //console.log(id_ser)
    userResp.forEach(elm => {

        conn.query(sql, [elm.numQuestion, elm.resp, id_user], (err, result) => {

            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
        })

    });
    res.json({
        'msg': 'Votre Enquete a été envoyé '
    })


}


module.exports.getAllSatisfactions = (req, res) => {

    const sql = "SELECT * FROM enquete_satisfaction,user WHERE enquete_satisfaction.id_user=user.id_user";
    conn.query(sql, [], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.json(result)
        }
    })

}

module.exports.getAllAResponse = (req, res) => {
    const qst = req.params.qst;
    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = ? AND Rep = ? ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}