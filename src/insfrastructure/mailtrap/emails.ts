import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Email Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log("Verification Email sent Successfully", response);
    } catch (error) {
        console.error("Error sending Verification email", error);

        throw new Error("Error sending Verification email");
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response =  await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid:"ba155a81-1580-4288-abcf-52f369158822",
            template_variables: {
                "company_info_name": "HemoBridge",
                "company_info_address": "1234 HemoBridge Avenue",
                "name": name
            },
        });

        console.log("Welcome Email sent Successfullyy", response);
    } catch (error) {
        console.error("Error sending Welcome email", error);

        throw new Error("Error sending Welcome email");
    }
};

export const sendResetPasswordEmail = async (email, resetUrl) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset",
        });

        console.log("Reset Password Email sent Successfully", response);
    } catch (error) {
        console.error("Error sending Reset Password email", error);

        throw new Error("Error sending Reset Password email", error);
    }
};

export const sendPasswordResetSuccess = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });

        console.log("Email sent Successfully", response);
    } catch (error) {
        console.error("Error sending email", error);

        throw new Error("Error sending email", error);
    }
};