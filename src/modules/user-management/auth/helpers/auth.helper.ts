import jwt, { JwtPayload } from "jsonwebtoken";

export const AuthHelper = {
  generateToken: (payload: object, secret: string, expiresIn: number): string => {
    return jwt.sign(payload, secret, { expiresIn: expiresIn });
  },
  verifyToken: async (token: string, secret: string): Promise<string | JwtPayload> => {
    try {
      return jwt.verify(token, secret);

    } catch (error) {
      console.log(error)
      throw error
    }
  },
};