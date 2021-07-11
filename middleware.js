var jwt = require('jsonwebtoken');
exports.checkAPITokens = async function (req, res, next) {
    // console.log("cds",req)
    let url = req._parsedUrl.pathname.split("/");

    if (noAuthRequired.indexOf(req._parsedUrl.pathname) == - 1) {
        try {

            if (req.headers.authorization == undefined) {
                res.send({
                    status: 400,
                    msg: "Token is Required"
                })
            }
            let USER_TOKEN = req.headers.authorization.split(' ')[1];

            var decoded = jwt.verify(USER_TOKEN, 'secretkey');

            if (decoded.username = "Deepak" && decoded.password == "1234") {

                next();
            } else {
                res.send({
                    status: 400,
                    msg: "Unautherized User"
                })
            }


        } catch (err) {

            res.send({
                status: 400,
                msg: err
            })

        }
    } else {
        next();
    }




}


var noAuthRequired = [
    '/users'
];