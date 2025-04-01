import { UserModel } from "./model/user.model";
import logger from "src/insfrastructure/logger/logger";
import { ICreateUser } from "./user.types";
import { fromRecordToEntity } from "./user.entity";

export const UserService = {
    create: async (newUser: ICreateUser)=> {
        
        // TODO: hash password
        const passwordHash = newUser.password;

        const createdUserRecord = await UserModel.create({
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password_hash: passwordHash,
            role: newUser.role
        })
        .catch((error)=> {
            logger.error("There was an error creating a new user");
            throw error
        })
        const createdUserEntity = fromRecordToEntity(createdUserRecord);
        logger.info(createdUserEntity)
        return fromRecordToEntity(createdUserRecord);
    }
}