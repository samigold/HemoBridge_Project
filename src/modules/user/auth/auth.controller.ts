import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { SessionService } from './session/session.service';
import { PasswordHelper } from 'src/shared/helpers/password.helper';
import { UserService } from '../base/user.service';
import { InternalServerError, NotFoundError, ValidationError } from 'src/shared/errors';

// import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail } from '../../insfrastructure/mailtrap/emails';

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public

export const AuthController = {

    // @desc    Login user
    // @route   POST /auth/login
    // @access  Public
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if(!email || !password){
            throw new ValidationError("Email and password fields are required")
        }

        //Check if user exists
        const user = await UserService.fetchByEmail(email)
        .catch(()=> { throw new InternalServerError("") })

        if(!user) throw new NotFoundError("Invalid email and password match");

        //Check if password is correct
        const isPasswordMatch = PasswordHelper.verify(password, user.passwordHash!);

        if(!isPasswordMatch) throw new NotFoundError("Invalid email and password match");

        const foundSession = await SessionService.findUserActiveSession(user.id)
        .catch(()=> { throw new Error()})

        if(foundSession) {
            await SessionService.revokeSession(user.id)
            .catch(()=> { throw new InternalServerError("") })
        }

        const newSession = await SessionService.add(user.id)
        .catch(()=> { throw new InternalServerError("") })

        if(!newSession) throw new NotFoundError("Invalid email and password match");
        
        delete user.passwordHash;
            
        res.cookie('session-id', newSession.accessToken, { httpOnly: true });

        res.status(200).json({
            success: true,
            message: `Authentication successful`,
            user
        });
    }),

    // @desc    Logout user
    // @route   POST /auth/logout
    // @access  Private
    logout: asyncHandler(async (req, res) => {
        res.clearCookie('session-id');
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    }),
    
    // @desc    Verify user email
    // @route   PUT /auth/verify
    // @access  Public
    verifyEmail: asyncHandler(async (req, res) => {
        // const { verificationToken } = req.body;

        // if(!verificationToken) {
        //     res.status(400);
        //     throw new Error('Verification token is required');
        // }

        // // Find user by verification token
        // const user = await User.findOne({
        //     verificationToken,
        //     verificationTokenExpiresAt: { $gt: Date.now() } // Check if token is not expired
        // });

        // if(!user) {
        //     res.status(400);
        //     throw new Error('Invalid or expired verification token');
        // }

        // // Verify user
        // user.status = 'active'; // Set user status to active
        // user.verificationToken = undefined; // Clear verification token
        // user.verificationTokenExpiresAt = undefined; // Clear expiration date

        
        // await user.save();

        // //send email to user
        // await sendWelcomeEmail(user.email, user.name);

        // res.status(200).json({
        //     success: true,
        //     message: 'Email verified successfully'
        // });
    }),

    // @desc    Resend verification email
    // @route   POST /auth/resend-verification
    // @access  Public
    resendVerificationEmail: asyncHandler(async (req, res) => {
        // const { email } = req.body;

        // if(!email){
        //     res.status(400);
        //     throw new Error('Email is required');
        // }

        // const user = await User.findOne({email});
        // if(!user){
        //     res.status(400);
        //     throw new Error('User not found');
        // }

        // if(user.status === 'active'){
        //     res.status(400);
        //     throw new Error('User already verified');
        // }

        // // Generate new verification token
        // const verificationToken = generateVerificationCode();

        // user.verificationToken = verificationToken;
        // user.verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        // await user.save();

        // // Send verification email
        // await sendVerificationEmail(user.email, verificationToken);

        // res.status(200).json({success: true, message: 'Verification email re-sent successfully'});
    }),

    // @desc    Forgot password
    // @route   POST /auth/forgot-password
    // @access  Public
    forgotPassword: asyncHandler(async (req, res) => {
        // const { email } = req.body;
        // if(!email){
        //     res.status(400);
        //     throw new Error('Email is required');
        // }

        // // Check if user exists
        // const user = await User.findOne({ email });
        // if(!user){
        //     res.status(400);
        //     throw new Error('User not found');
        // }

        // // Generate reset token
        // const resetToken = crypto.randomBytes(20).toString('hex');
        // const resetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        // user.resetToken = resetToken;
        // user.resetTokenExpires = resetTokenExpires;

        // await user.save();

        // // Send reset password email
        // await sendResetPasswordEmail(user.email, `${req.protocol}://${req.get('host')}/auth/reset-password/${resetToken}`);

        // res.status(200).json({
        //     success: true,
        //     message: 'Reset password email sent successfully'
        // });
    }),

    // @desc    Reset password
    // @route   POST /auth/reset-password/:token
    // @access  Public
    resetPassword: (req:Request, res:Response) => {
        // const { token } = req.params;
        // const { password } = req.body;

        // const user = await User.findOne({resetToken: token, resetTokenExpires: {$gt: Date.now()}});

        // if(!user){
        //     return res.status(400).json({message: 'Invalid or expired reset token'});
        // }

        // const passwordHash = await bcrypt.hash(password, 12);

        // user.password = passwordHash;
        // user.resetPasswordToken = undefined;
        // user.resetPasswordExpiresAt = undefined;  

        // await user.save();

        // //send email
        // await sendPasswordResetSuccess(user.email);

        // res.status(200).json({message: 'Password reset successfully'});
    },
}