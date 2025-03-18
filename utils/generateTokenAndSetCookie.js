import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (user, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7h'
    });

res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 7 * 60 * 60 * 1000, //7 hours,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 7 * 60 * 60 * 1000 //7 hours
})

    return token;
}