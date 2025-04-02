import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserRoles } from "./model/user.record";

export const UserController = {
    registerDonor: (req: Request, res: Response) => {

        const { firstName, lastName, email, password, phoneNumber, dateOfBirth, gender, bloodType, address } = req.body;

        if (!firstName || !lastName || !email || !password || !phoneNumber || !dateOfBirth || !gender || !bloodType || !address) {
            res.status(400);
            throw new Error('All fields are required');
        }

        UserService.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            role: UserRoles.DONOR

        }).catch(()=> {
            throw new Error('Invalid donor data. Error creating Donor');
        })
    },

    registerCareGiver: (req: Request, res: Response) => {

        const { first_name, last_name, email, password, phone, dateOfBirth, gender, bloodType, address } = req.body;

        if (!first_name || !last_name || !email || !password || !phone || !dateOfBirth || !gender || !bloodType || !address) {
            res.status(400);
            throw new Error('All fields are required');
        }

        UserService.create({
            first_name,
            last_name,
            email,
            password,
            role: UserRoles.CARE_GIVER
        })
        .catch((error)=> {
            throw new Error('Invalid caregiver data. Error creating caregiver');
        })
    },

    registerStaff: (req: Request, res: Response) => {

        const { first_name, last_name, email, password, phone, dateOfBirth, gender, bloodType, address } = req.body;

        if (!first_name || !last_name || !email || !password || !phone || !dateOfBirth || !gender || !bloodType || !address) {
            res.status(400);
            throw new Error('All fields are required');
        }

        UserService.create({
            first_name,
            last_name,
            email,
            password,
            role: UserRoles.CARE_GIVER
        })
        .catch((error)=> {
            throw new Error('Invalid caregiver data. Error creating caregiver');
        })
    },

    registerAdmin: (req: Request, res: Response) => {

        const { first_name, last_name, email, password, phone, dateOfBirth, gender, bloodType, address } = req.body;

        if (!first_name || !last_name || !email || !password || !phone || !dateOfBirth || !gender || !bloodType || !address) {
            res.status(400);
            throw new Error('All fields are required');
        }

        UserService.create({
            first_name,
            last_name,
            email,
            password,
            role: UserRoles.CARE_GIVER
        })
        .catch((error)=> {
            throw new Error('Invalid caregiver data. Error creating caregiver');
        })
    }
}

