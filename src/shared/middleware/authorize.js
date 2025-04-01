import jwt from 'jsonwebtoken';

export const authorize = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Not authorized to access this route' });
        throw new Error('Not authorized to access this route');
    }
};