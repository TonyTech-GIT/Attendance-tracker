import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    let headerBearer = req.headers.authorization;

    if (headerBearer && headerBearer.startsWith('Bearer')) {
        try {
            // get token from header...
            token = headerBearer.split(' ')[1]

            // verify the user...
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from token...
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token!')
    }
})


export default protect;