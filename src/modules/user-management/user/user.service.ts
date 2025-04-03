import { UserModel } from "./model/user.model";
import logger from "src/insfrastructure/logger/logger";
import { ICreateAdminUser, ICreateUser } from "./user.types";
import { UserEntity } from "./user.entity";
import eventBus from "src/shared/events/event-bus";
import { USER_EVENTS } from "src/shared/events/user.events";
import { PasswordHelper } from "src/shared/helpers/password.helper";
import { UserRoles } from "./model/user.record";

export const UserService = {
    createDonor: async (newUser: ICreateUser)=> {
        
        // TODO: hash password
        const passwordHash = PasswordHelper.hash(newUser.password);

        const createdUserRecord = await UserModel.create({
            email: newUser.email,
            phone_number: newUser.phone_number,
            password_hash: passwordHash,
            role: newUser.role
        })
        .catch((error)=> {
            console.log(error)
            // logger.error("There was an error creating a new user");
            throw error
        })
        
        const createdUserEntity = UserEntity.fromRecordToEntity(createdUserRecord);
        // emit the user created successfully event
        eventBus.emit(USER_EVENTS.CREATED, { 
            user_id: createdUserEntity.id, 
            email: createdUserEntity.email, 
            first_name: newUser.first_name, 
            last_name: newUser.last_name, 
            phone_number: newUser.phone_number, 
            blood_type: newUser.blood_type 
        });

        logger.info(createdUserEntity)
        return UserEntity.fromRecordToEntity(createdUserRecord);
    },

    createAdmin: async (newUser: ICreateAdminUser)=> {
        
        // TODO: hash password
        const passwordHash = PasswordHelper.hash(newUser.password);

        const createdUserRecord = await UserModel.create({
            email: newUser.email,
            password_hash: passwordHash,
            role: UserRoles.ADMIN
        })
        .catch((error)=> {
            console.log(error)
            // logger.error("There was an error creating a new user");
            throw error
        })
        
        const createdUserEntity = UserEntity.fromRecordToEntity(createdUserRecord);
        // emit the user created successfully event
        eventBus.emit(USER_EVENTS.CREATED, { 
            user_id: createdUserEntity.id, 
            email: createdUserEntity.email, 
            first_name: newUser.first_name, 
            last_name: newUser.last_name, 
        });

        logger.info(createdUserEntity)
        return UserEntity.fromRecordToEntity(createdUserRecord);
    },

    fetchByEmail: async (email:string)=> {
        const userRecord = await UserModel.findOne({ email })
        .catch((error)=> { 
            console.log("There was an error fetching user by email: ", error);
            throw new Error(error) 
        })

        if(!userRecord) throw new Error("User not found");

        return UserEntity.fromRecordToEntity(userRecord)
    }
}