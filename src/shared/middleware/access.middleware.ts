import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors";
import { USER_ROLE } from "../constants/user-role.enum";

export const validateAccess = (...allowedRoles:USER_ROLE[])=> {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.session || !req.user) {
            throw new NotAuthorizedError("Unauthorized. No user found.")
        }

        if(!allowedRoles.includes(req.user.role as USER_ROLE)) {
            throw new NotAuthorizedError("Unauthorized access.")
        }

        next();
    }
}