import { NotFoundError } from "src/shared/errors";
import { FacilityStaffEntity } from "./facility-staff.entity";
import { ICreateFacility } from "./facility-staff.types";
import { FacilityStaffModel } from "./model/facility-staff.model";
import eventBus from "src/shared/events/event-bus";
import { FacilityStaffUserCreatedEvent, USER_EVENTS } from "src/shared/events/user.events";
import { USER_ROLE } from "src/shared/constants/user-role.enum";
import { FacilityModel } from "../base/model/facility.model";

export const FacilityStaffService = {
    create: async(newFacility: ICreateFacility)=> {
        const createdFacilityRecord = await FacilityStaffModel.create({
            user_id: newFacility.user_id,
            facility_id: newFacility.facility_id,
            first_name: newFacility.first_name,
            last_name: newFacility.last_name,
            address: newFacility.address,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            phone_number: newFacility.phone_number,

        }).catch((error)=> {
            console.error("There was an error creating health care facility: ", error);
            throw error
        })

        if(!createdFacilityRecord) throw new NotFoundError("Facility record not created successfully");

        return FacilityStaffEntity.fromRecordToEntity(createdFacilityRecord);
    },

    getByUserId: async (id:string)=> {
        const result = await FacilityStaffModel.findOne({ user_id: id })
        .catch((error)=> { throw error })
        
        if(!result) throw new NotFoundError("Facility staff not found");

        return FacilityStaffEntity.fromRecordToEntity(result)
    }
}

eventBus.on(USER_EVENTS.CREATED, async (userPayload: FacilityStaffUserCreatedEvent) => {
    if (userPayload.role === USER_ROLE.FACILITY_STAFF) { // Process only if the role is "facility_staff"
        await FacilityStaffService.create(userPayload);
    }
});