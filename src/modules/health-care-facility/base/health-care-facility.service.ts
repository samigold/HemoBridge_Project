import { HealthCareFacilityEntity } from "./health-care-facility.entity";
import { ICreateHealthCareFacility } from "./health-care-facility.types";
import { HealthCareFacilityModel } from "./model/health-care-facility.model";

export const HealthCareFacilityService = {
    create: async(newFacility: ICreateHealthCareFacility)=> {
        const createdFacilityRecord = await HealthCareFacilityModel.create({
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

        return HealthCareFacilityEntity.fromRecordToEntity(createdFacilityRecord);
    }
}