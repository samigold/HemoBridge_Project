import { NotFoundError } from "src/shared/errors";
import { FacilityStaffEntity } from "./facility-staff.entity";
import { ICreateFacility } from "./facility-staff.types";
import { FacilityStaffModel } from "./model/facility-staff.model";

export const FacilityStaffService = {
    create: async(newFacility: ICreateFacility)=> {
        const createdFacilityRecord = await FacilityStaffModel.create({
            name: newFacility.name,
            address: newFacility.address,
            contact_info: {
                email: newFacility.email,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                phone_number: newFacility.phoneNumber
            },
            operational_hours: newFacility.operationalHours
        
        }).catch((error)=> {
            console.error("There was an error creating health care facility: ", error);
            throw error
        })

        if(!createdFacilityRecord) throw new NotFoundError("Facility record not created successfully");

        return FacilityStaffEntity.fromRecordToEntity(createdFacilityRecord);
    }
}