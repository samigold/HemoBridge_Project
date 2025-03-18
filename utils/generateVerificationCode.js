export const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
};//This function generates a random 6 digit verification code. It is used to generate a verification code for the user