import jwt from 'jsonwebtoken';
import Config from '../../config';
import User from '../models/user';

export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        jwt.verify(token, Config.jwtSecret, (err, decoded) => {
            if (err) {
                    res.status(401).json({ error: "We were unable to verify your token. Please login again."
                });
            } else {
                User.query({
                    where: { id: decoded.id },
                    select: [ 'email', 'id', 'username' ]
                }).fetch().then(user => {
                    if (!user) {
                        res.status(400).json({ 
                            error: "The user this token belongs to does not exist. Please login again"
                        });
                    } else {
                        req.currentUser = user;
                        next();
                    }
                });
            }
        });
    } else {
        res.status(403).json({
            error: "No token was provided. Please login again"
        });
    }
}