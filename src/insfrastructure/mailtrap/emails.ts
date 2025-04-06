import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
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

export const sendWelcomeEmail = async (email: string, name: string) => {
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

export const sendResetPasswordEmail = async (email: string, resetUrl: string) => {
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

        throw new Error("Error sending Reset Password email");
    }
};

export const sendPasswordResetSuccess = async (email: string) => {
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

        throw new Error("Error sending email");
    }
};