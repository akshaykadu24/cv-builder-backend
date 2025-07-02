const jwt = require('jsonwebtoken');

const Authentication = (req, res, next) => {
    let token = req.headers.authorization
    console.log("yessss", token)
    if (token) {
        jwt.verify(token, 'shhhhh', function (err, decoded) {
            console.log(decoded, "kkkk") // bar
            req.userID = decoded?.userID
            decoded ?
                next()
                : res.send({ success: "false", msg: "wrong token" })
        });
    } else {
        res.send({ msg: "token is missing" })
    }

}

module.exports = { Authentication }