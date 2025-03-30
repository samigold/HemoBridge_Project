import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { User } from '../models/userModel.js';
import { Donor } from '../models/donorModel.js';
import { Facility } from '../models/facilityModel.js';
import { generateVerificationCode } from '../utils/generateVerificationCode.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail } from '../mailtrap/emails.js';

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public
export const registerDonor = asyncHandler(async (req, res) => {
    const { name, email, password, phone, dateOfBirth, gender, bloodType, address } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !phone || !dateOfBirth || !gender || !bloodType || !address) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ success: false, message: 'User already exists' });
        return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const verificationToken = generateVerificationCode();
    console.log(verificationToken);

    // Create new user
    const user = await User.create({
        name,
        email,
        password: passwordHash,
        role: 'donor',
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    if (user) {
        await user.save();

        // Create new donor profile
        const donor = await Donor.create({
            userId: user._id,
            phone,
            dateOfBirth,
            gender,
            bloodType,
            address
        });

        if(!donor){
            res.status(400).json({ success: false, message: 'Error creating Donor' });
            throw new Error('Invalid donor data. Error creating Donor');
        }

        // Generate JWT token and set it in a cookie
        generateTokenAndSetCookie(res, user._id);

        // Send email with verification code (if implemented)
        // sendEmail(user.email, verificationToken);
        await sendVerificationEmail(user.email, verificationToken);

        // Respond with user data (excluding password)
        res.status(201).json({
            success: true,
            message: 'Donor successfully',
            user:{
                name: user.name,
                email: user.email,
                role: user.role,
            },
            donor
        });
    } else {
        res.status(400).json({ success: false, message: 'Error creating Donor' });
        throw new Error('Invalid user data');
    }
});

// @desc    Register a new facility
// @route   POST /auth/register/facility
// @access  Public
export const registerFacility = asyncHandler(async (req, res) => {
    const { facilityName, personnelName, email, phone, personnelRole, address, password } = req.body;

    console.log(req.body);
    // Check if all fields are provided
    if (!facilityName || !personnelName || !email || !phone || !personnelRole || !address || !password) {
        console.log('missing fields', {facilityName, personnelName, email, phone, personnelRole, address, password});
        res.status(400);
        throw new Error('All fields are required');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ success: false, message: 'User already exists' });
        return;
    }

    //create User
    const passwordHash = await bcrypt.hash(password, 12);
    const verificationToken = generateVerificationCode();
    console.log(verificationToken);

    const user = await User.create({
        name: personnelName,
        email,
        password: passwordHash,
        role: 'healthcare_staff',
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    if(!user){
        res.status(400).json({ success: false, message: 'Error creating User' });
        throw new Error('Invalid user data. Error creating User');
    }

    // Create new facility
    const facility = await Facility.create({
        userId: user._id,
        facilityName,
        personnelName,
        email,
        phone,
        personnelRole,
        address
    });

    if(!facility){
        res.status(400).json({ success: false, message: 'Error creating Facility' });
        throw new Error('Invalid facility data. Error creating Facility');
    }

    // Generate JWT token and set it in a cookie
    generateTokenAndSetCookie(res, user._id);

    // Send email with verification code (if implemented)
    // sendEmail(user.email, verificationToken);
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
        success: true,
        message: 'Facility successfully created',
        user:{
            name: user.name,
            email: user.email,
            role: user.role,
        },
        facility
    });

})

// @desc    Verify user email
// @route   PUT /auth/verify
// @access  Public
export const verifyEmail = asyncHandler(async (req, res) => {
    const { verificationToken } = req.body;

    if(!verificationToken) {
        res.status(400);
        throw new Error('Verification token is required');
    }

    // Find user by verification token
    const user = await User.findOne({
        verificationToken,
        verificationTokenExpiresAt: { $gt: Date.now() } // Check if token is not expired
    });

    if(!user) {
        res.status(400);
        throw new Error('Invalid or expired verification token');
    }

    // Verify user
    user.status = 'active'; // Set user status to active
    user.verificationToken = undefined; // Clear verification token
    user.verificationTokenExpiresAt = undefined; // Clear expiration date

    
    await user.save();

    //send email to user
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
        success: true,
        message: 'Email verified successfully'
    });
    
});


// @desc    Resend verification email
// @route   POST /auth/resend-verification
// @access  Public
export const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if(!email){
        res.status(400);
        throw new Error('Email is required');
    }

    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error('User not found');
    }

    if(user.status === 'active'){
        res.status(400);
        throw new Error('User already verified');
    }

    // Generate new verification token
    const verificationToken = generateVerificationCode();

    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({success: true, message: 'Verification email re-sent successfully'});
});


// @desc    Login user
// @route   POST /auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error('All fields are required');
    }

    //Check if user exists
    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error('Invalid email or password');
    }

    //Check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
        res.status(400);
        throw new Error('Invalid email or password');
    }

    //jwt token
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = Date.now();

    await user.save();
    res.status(200).json({
        success: true,
        message: `Welcome back ${user.name}`,
        user
    });
})

// @desc    Logout user
// @route   POST /auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
})

// @desc    Forgot password
// @route   POST /auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if(!email){
        res.status(400);
        throw new Error('Email is required');
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if(!user){
        res.status(400);
        throw new Error('User not found');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;

    await user.save();

    // Send reset password email
    await sendResetPasswordEmail(user.email, `${req.protocol}://${req.get('host')}/auth/reset-password/${resetToken}`);

    res.status(200).json({
        success: true,
        message: 'Reset password email sent successfully'
    });
})

// @desc    Reset password
// @route   POST /auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({resetToken: token, resetTokenExpires: {$gt: Date.now()}});

    if(!user){
        return res.status(400).json({message: 'Invalid or expired reset token'});
    }

    const passwordHash = await bcrypt.hash(password, 12);

    user.password = passwordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;  

    await user.save();

    //send email
    await sendPasswordResetSuccess(user.email);

    res.status(200).json({message: 'Password reset successfully'});
});