import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { User } from '../models/userModel.js';
import { Donor } from '../models/donorModel.js';
import { Facility } from '../models/facilityModel.js';
import { generateVerificationCode } from '../utils/generateVerificationCode.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

import { sendVerificationEmail } from '../mailtrap/emails.js';

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

    // Check if all fields are provided
    if (!facilityName || !personnelName || !email || !phone || !personnelRole || !address || !password) {
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
// @route   POST /auth/verify
// @access  Public



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
    });
})