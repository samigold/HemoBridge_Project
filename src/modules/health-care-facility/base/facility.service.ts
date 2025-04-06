import { FacilityEntity } from "./facility.entity";
import { ICreateFacility } from "./facility.types";
import { FacilityModel } from "./model/facility.model";

export const FacilityService = {
    create: async(newFacility: ICreateFacility)=> {
        const createdFacilityRecord = await FacilityModel.create({
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

        return FacilityEntity.fromRecordToEntity(createdFacilityRecord);
    }
}