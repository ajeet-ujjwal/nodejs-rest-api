const jwt = require('jsonwebtoken');

function isLoggedIn(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).json({ message: 'No token, authorization denied.' });
    try {
        const user = jwt.verify(token, 'supersecretkey');
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

exports.isLoggedIn = isLoggedIn