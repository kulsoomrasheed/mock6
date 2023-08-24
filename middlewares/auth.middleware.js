const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.secret);
            if (decoded) {
                next();
            } else {
                res.status(401).send("Not authorized"); 
            }
        } catch (err) {
            res.status(401).send("Invalid token"); 
        }
    } else {
        res.status(401).send("No token provided");
    }
};

module.exports = { auth };





