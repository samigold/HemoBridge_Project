import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authorize = (req, res, next) => {
    try {
        // Check if the JWT token exists in cookies
        const token = req.cookies.jwt;
        if (!token) {
            console.error('Authorization failed: No token provided');
            return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            console.error('Authorization failed: Invalid token');
            return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
        }

        // Attach the user ID to the request object
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Authorization error:', error.message);
        res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};