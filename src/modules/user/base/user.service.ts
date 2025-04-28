import { UserModel } from "./model/user.model";
import { ICreateUser } from "./user.types";
import { UserEntity } from "./user.entity";
import { PasswordHelper } from "src/shared/helpers/password.helper";
import eventBus from "src/shared/events/event-bus";
import { FACILITY_EVENTS, FacilityCreatedEvent } from "src/shared/events/facility.events";
import { USER_ROLE } from "src/shared/constants/user-role.enum";
import { FacilityStaffUserCreatedEvent, USER_EVENTS } from "src/shared/events/user.events";

export const UserService = {
    fetchById: async (id:string)=> {
        const userRecord = await UserModel.findOne({ _id: id })
        .catch((error)=> { 
            console.log("There was an error fetching user by email: ", error);
            throw new Error(error) 
        })

        if(!userRecord) throw new Error("User not found");

        return UserEntity.fromRecordToEntity(userRecord)
    },

    // createAdmin: async (newUser: ICreateAdminUser)=> {
        
    //     const passwordHash = PasswordHelper.hash(newUser.password);

    //     const createdUserRecord = await UserModel.create({
    //         email: newUser.email,
    //         password_hash: passwordHash,
    //         role: UserRoles.ADMIN

    //     }).catch((error)=> {
    //         console.log(error)
    //         // logger.error("There was an error creating a new user");
    //         throw error
    //     })
        
    //     const createdUserEntity = UserEntity.fromRecordToEntity(createdUserRecord);
    //     // emit the user created successfully event
    //     eventBus.emit(USER_EVENTS.CREATED, { 
    //         user_id: createdUserEntity.id, 
    //         email: createdUserEntity.email, 
    //         first_name: newUser.first_name, 
    //         last_name: newUser.last_name, 
    //     });

    //     logger.info(createdUserEntity)
    //     return UserEntity.fromRecordToEntity(createdUserRecord);
    // },

    fetchByEmail: async (email:string)=> {
        const userRecord = await UserModel.findOne({ email })
        .catch((error)=> { 
            console.error("There was an error fetching user by email: ", error);
            throw new Error(error) 
        })

        if(!userRecord) return userRecord

        return UserEntity.fromRecordToEntity(userRecord)
    },

    create: async (newUser: ICreateUser): Promise<UserEntity> => {
        
        // TODO: hash password
        const passwordHash = PasswordHelper.hash(newUser.password);

        const createdUserRecord = await UserModel.create({
            email: newUser.email,
            phone_number: newUser.phone_number,
            password_hash: passwordHash,
            role: newUser.role

        }).catch((error)=> {
            console.error(error)
            // logger.error("There was an error creating a new user");
            throw error
        })
        
        return UserEntity.fromRecordToEntity(createdUserRecord);
    },
}

eventBus.on(FACILITY_EVENTS.CREATED, async (facilityPayload: FacilityCreatedEvent) => {
    const newUser = await UserService.create({
        email: facilityPayload.personnel.email,
        phone_number: facilityPayload.personnel.phone_number,
        password: facilityPayload.personnel.password,
        role: USER_ROLE.FACILITY_STAFF

    }).catch((error)=> {
        console.error("There was an error creating new faciltiy staff user", error);
        throw error;
    })

    const payload: FacilityStaffUserCreatedEvent = {
        facility_id: facilityPayload.facility_id,
        user_id: newUser.id,
        first_name: facilityPayload.personnel.first_name,
        last_name: facilityPayload.personnel.last_name,
        phone_number: facilityPayload.personnel.phone_number,
        address: "",
        role: USER_ROLE.FACILITY_STAFF
    }

    eventBus.emit(USER_EVENTS.CREATED, payload);
})