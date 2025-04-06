import { Request, Response } from "express";
import { UserService } from "./user.service";
import eventBus from "src/shared/events/event-bus";
import { USER_EVENTS } from "src/shared/events/user.events";
import { USER_ROLE } from "src/shared/constants/user-role.enum";

export const UserController = {
    registerDonor: async (req: Request, res: Response) => {

        const { firstName, lastName, email, password, phoneNumber, bloodType, address } = req.body;

        if (!firstName || !lastName || !email || !password || !phoneNumber || !bloodType || !address) {
            res.status(400);
            throw new Error('All fields are required');
        }

        const createdUserEntity = await UserService.create({
            email,
            password,
            phone_number: phoneNumber,
            role: USER_ROLE.DONOR

        }).catch(()=> {
            throw new Error('Invalid donor data. Error creating Donor');
        })

        eventBus.emit(USER_EVENTS.CREATED, {
            user_id: createdUserEntity.id,
            first_name: firstName,
            last_name: lastName,
            blood_type: bloodType,
            address: address,
            phone_number: phoneNumber,
            role: USER_ROLE.DONOR,
        });
        
        delete createdUserEntity.passwordHash
        
        res.status(201).json({
            success: true,
            message: "New donor user created successfully",
            user: createdUserEntity
        });
    },

    registerCareGiver: async (req: Request, res: Response) => {

        const { firstName, lastName, email, password, phoneNumber, address } = req.body;

        if (!firstName || !lastName || !email || !password || !phoneNumber || !address) {
            res.status(400);
            throw new Error('All fields are required');
        }

        const createdUserEntity = await UserService.create({
            email,
            password,
            phone_number: phoneNumber,
            role: USER_ROLE.CARE_GIVER
        })
        .catch(()=> {
            throw new Error('Invalid caregiver data. Error creating caregiver');
        })

        eventBus.emit(USER_EVENTS.CREATED, {
            user_id: createdUserEntity.id,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            address: address,
            role: USER_ROLE.CARE_GIVER,
        });

        res.status(201).json({
            success: true,
            message: "New care giver user created successfully"
        });
    },

    registerFacilityStaff: async (req: Request, res: Response) => {

        const { facilityId, firstName, lastName, email, password, phoneNumber, address } = req.body;

        if (!facilityId || !firstName || !lastName || !email || !password || !phoneNumber || !address) {
            res.status(400);
            throw new Error('All fields are required');
        }

        const createdUserEntity = await UserService.create({
            email,
            password,
            phone_number: phoneNumber,
            role: USER_ROLE.FACILITY_STAFF

        }).catch(()=> {
            throw new Error('Invalid donor data. Error creating Donor');
        })

        eventBus.emit(USER_EVENTS.CREATED, {
            user_id: createdUserEntity.id,
            first_name: firstName,
            last_name: lastName,
            address: address,
            phone_number: phoneNumber,
            role: USER_ROLE.FACILITY_STAFF,
        });
        
        delete createdUserEntity.passwordHash
        
        res.status(201).json({
            success: true,
            message: "New donor user created successfully",
            user: createdUserEntity
        });
    },

    registerAdmin: async (req: Request, res: Response) => {

        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            res.status(400);
            throw new Error('All fields are required');
        }

        const createdUserEntity = await UserService.create({
            email,
            password,
            role: USER_ROLE.DONOR

        }).catch(()=> {
            throw new Error('Invalid donor data. Error creating Donor');
        })

        eventBus.emit(USER_EVENTS.CREATED, {
            user_id: createdUserEntity.id,
            email: createdUserEntity.id,
            first_name: createdUserEntity.id,
            last_name: createdUserEntity.id,
            role: USER_ROLE.ADMIN,
        });
        
        delete createdUserEntity.passwordHash
        
        res.status(201).json({
            success: true,
            message: "New admin user created successfully",
            user: createdUserEntity
        });
    },

    // registerCareGiver: (req: Request, res: Response) => {

    //     const { firstName, lastName, email, password, phone, address } = req.body;
    //     console.log("caregiver", req.body);
    //     if (!firstName || !lastName || !email || !password || !phone || !address) {
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

