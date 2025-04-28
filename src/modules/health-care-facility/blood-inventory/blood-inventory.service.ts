import { InternalServerError } from "src/shared/errors"
import { ICreateBloodInventory } from "./blood-inventory.types"
import { BloodInventoryModel } from "./model/blood-inventory.model"
import { BloodInventoryEntity } from "./blood-inventory.entity"

export const BloodInventoryService = {
    findByFacilityId: async (facilityId: string)=> {
        const foundInventoryRecords = await BloodInventoryModel.find({ facility_id: facilityId })
        .catch((error)=> { 
            console.error("There was an error finding blood inventory record: ", error);
            throw new InternalServerError("")
        })

        return  foundInventoryRecords.map(record => BloodInventoryEntity.fromRecord(record))
    },

    create: async (newBloodInventory: ICreateBloodInventory)=> {
        const createdRecord = await BloodInventoryModel.create({
            facility_id: newBloodInventory.facilityId,
            blood_type: newBloodInventory.bloodType,
            units_available: newBloodInventory.unitsAvailable
            
        })
        .catch((error)=> { 
            console.error("There was an error creating new blood inventory record: ", error);
            throw new InternalServerError("") 
        })

        return BloodInventoryEntity.fromRecord(createdRecord);
    }
}