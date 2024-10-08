const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const UserModel = require('../models/User')
const JWT_SECRET = process.env.JWT_SECRET

const auth = async (req, res, next) => {
    let token
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET)
            req.user = await UserModel.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
}

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: 'Only Admin can Access this route' });
    }
};

module.exports = { auth, admin }