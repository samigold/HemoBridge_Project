import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { User } from '../models/userModel.js';
import { generateVerificationCode } from '../utils/generateVerificationCode.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';


export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // check if all fields are provided
    if(!name || !email || !password){
        res.status(400);
        throw new Error('All fields are required');
    }

    // check if user already exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).json({success: false, message: 'User already exists'});
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const verificationToken = generateVerificationCode();
    console.log(verificationToken);

    // create new user
    const user = await User.create({
        name,
        email,
        password: passwordHash,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    if(user){
        await user.save();

        //jwt token
        generateTokenAndSetCookie(res, user._id);

        // send email with verification code
        // sendEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            ...user.doc,
            password: undefined});
    } else {
        res.status(400).json({success: false, message: 'Error creating user'});
        throw new Error('Invalid user data');
    }
});