import { randomBytes, scrypt, scryptSync } from "node:crypto";

export const PasswordHelper = {
  validate: function(password:string): { error: boolean; message: string; } {
    const MIN_LENGTH = 8;
    const MAX_LENGTH = 20;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < MIN_LENGTH || password.length > MAX_LENGTH) {
      return { error: true, message: 'Password must be between 8 and 20 characters' };
    }

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      return { error: true, message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' };
    }

    return { error: false, message: "Password is valid"}
  },

  hash(password:string): string {
    // generate random salt, 16 bytes long
    const salt = randomBytes(16).toString('hex');

    const derivedKey = scryptSync(password, salt, 64);

    const hashedPassword = `${salt}:${derivedKey.toString('hex')}`
    return hashedPassword
  },

  verify(password:string, hashedPassword:string):boolean {
    // seperate the salt from the key
    const [salt, key] = hashedPassword.split(':');
    const derivedKey = scryptSync(password, salt, 64);
    return key === derivedKey.toString('hex')
  }
}