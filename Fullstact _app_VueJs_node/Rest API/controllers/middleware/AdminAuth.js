const jwt = require("jsonwebtoken")
const secret = "fgiegeighlegbksngjgurgksbgjsbdgbsjgbsbg"

module.exports = function(req, res, next) {

    
    const authToken = req.headers['authorization']
    if(authToken) {
        const bearer = authToken.split(' ');
        let token = bearer[1]

        try {
            let decoded = jwt.verify(token, secret)
            if(decoded.role == 1) {
                next();
            } else {
                res.status(403)
                res.send("without permission");
                return
            }
        } catch(err) {
            res.status(403)
            res.send("invalid token");
            return
        }
        
    } else {
        res.status(403)
        res.send("without token");
        return
    }
}