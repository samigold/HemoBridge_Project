import { Request, Response } from "express";
import { UserService } from "./user.service";
import eventBus from "src/shared/events/event-bus";
import { USER_EVENTS } from "src/shared/events/user.events";
import { USER_ROLE } from "src/shared/constants/user-role.enum";
import { ValidationError } from "src/shared/errors";

export const UserController = {
    registerDonor: async (req: Request, res: Response) => {

        const { firstName, lastName, email, password, phoneNumber, bloodType, address } = req.body;

        if (!firstName || !lastName || !email || !password || !phoneNumber || !bloodType || !address) {
            throw new ValidationError('All fields are required');
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
            throw new ValidationError('All fields are required');
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
            throw new ValidationError('All fields are required');
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
    }
}

