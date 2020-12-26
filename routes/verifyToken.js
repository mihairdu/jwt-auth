const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-header');
    if (!token) {
        return res.status(401).send('Access Denied!');
    }

    try {
        const verifiec = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
}