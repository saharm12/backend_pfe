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

    const sql = "SELECT * FROM enquete_satisfaction ";
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
module.exports.getResponse1A = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 1 AND Rep = A ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}
module.exports.getResponse1B = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 1 AND Rep = B ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}
module.exports.getResponse1C = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 1 AND Rep = C ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}
module.exports.getResponse2A = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 2 AND Rep = A ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}
module.exports.getResponse2B = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 2 AND Rep = B ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}
module.exports.getResponse2C = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 2 AND Rep = C ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}
module.exports.getResponse3A = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 3 AND Rep = A ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}


module.exports.getResponse3B = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 3 AND Rep = B ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}
module.exports.getResponse3C = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 3 AND Rep = C ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}

module.exports.getResponse4A = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 4 AND Rep = A ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}
module.exports.getResponse4B = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 4 AND Rep =B ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}
module.exports.getResponse4C = (req, res) => {
    const qst = req.params.qst;

    const rep = req.params.rep;
    const sql = "SELECT COUNT(*)  AS res FROM enquete_satisfaction WHERE numQuestion = 4 AND Rep = C ";
    conn.query(sql, [qst, rep], (err, result) => {

        if (err) {
            console.log(err)
        } else {
            console.log(result[0]);
            res.json(result[0])
        }
    })
}