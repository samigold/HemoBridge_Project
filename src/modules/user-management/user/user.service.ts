import { UserModel } from "./model/user.model";
import logger from "src/insfrastructure/logger/logger";
import { ICreateUser } from "./user.types";
import { fromRecordToEntity } from "./user.entity";
import eventBus from "src/shared/events/event-bus";
import { USER_EVENTS } from "src/shared/events/user.events";

export const UserService = {
    create: async (newUser: ICreateUser)=> {
        
        // TODO: hash password
        const passwordHash = newUser.password;

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
        
        const createdUserEntity = fromRecordToEntity(createdUserRecord);
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
        return fromRecordToEntity(createdUserRecord);
    }
}