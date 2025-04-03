import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserRoles } from "./model/user.record";

export const UserController = {
    registerDonor: (req: Request, res: Response) => {

        const { firstName, lastName, email, password, phoneNumber, bloodType, address } = req.body;

        if (!firstName || !lastName || !email || !password || !phoneNumber || !bloodType || !address) {
            res.status(400);
            throw new Error('All fields are required');
        }

        UserService.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            address: address,
            phone_number: phoneNumber,
            blood_type: bloodType,
            role: UserRoles.DONOR

        }).then((createdUser) => {
            res.status(201).json({
                success: true,
                message: "Donor created successfully",
                user: createdUser
            });
        }).catch(()=> {
            throw new Error('Invalid donor data. Error creating Donor');
        })
    },

    registerCareGiver: (req: Request, res: Response) => {

        const { firstName, lastName, email, password, phone, address } = req.body;
        console.log("caregiver", req.body);
        if (!firstName || !lastName || !email || !password || !phone || !address) {
            res.status(400);
            throw new Error('All fields are required');
        }

        UserService.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            address,
            phone_number: phone,
            blood_type: " ", // Assuming blood type is not required for caregivers
            role: UserRoles.CARE_GIVER
        }).then((createdUser) => {
            res.status(201).json({
                success: true,
                message: "Caregiver created successfully",
                user: createdUser
            });
        })
        .catch(()=> {
            throw new Error('Invalid caregiver data. Error creating caregiver');
        })
    },

    // registerStaff: (req: Request, res: Response) => {

    //     const { first_name, last_name, email, password, phone, dateOfBirth, gender, bloodType, address } = req.body;

    //     if (!first_name || !last_name || !email || !password || !phone || !dateOfBirth || !gender || !bloodType || !address) {
    //         res.status(400);
    //         throw new Error('All fields are required');
    //     }

    //     UserService.create({
    //         first_name,
    //         last_name,
    //         email,
    //         password,
    //         phone_number: phone,
    //         role: UserRoles.CARE_GIVER
    //     })
    //     .catch((error)=> {
    //         throw new Error('Invalid caregiver data. Error creating caregiver');
    //     })
    // },

    // registerAdmin: (req: Request, res: Response) => {

    //     const { first_name, last_name, email, password, phone, dateOfBirth, gender, bloodType, address } = req.body;

    //     if (!first_name || !last_name || !email || !password || !phone || !dateOfBirth || !gender || !bloodType || !address) {
    //         res.status(400);
    //         throw new Error('All fields are required');
    //     }

    //     UserService.create({
    //         first_name,
    //         last_name,
    //         email,
    //         password,
    //         role: UserRoles.CARE_GIVER
    //     })
    //     .catch((error)=> {
    //         throw new Error('Invalid caregiver data. Error creating caregiver');
    //     })
    // }
}

