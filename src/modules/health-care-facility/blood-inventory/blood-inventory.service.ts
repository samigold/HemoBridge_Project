import { InternalServerError } from "src/shared/errors"
import { ICreateBloodInventory } from "./blood-inventory.types"
import { BloodInventoryModel } from "./model/blood-inventory.model"
import { BloodInventoryEntity } from "./blood-inventory.entity"
import { DonorBloodTypes } from "src/modules/user/donor/model/donor.record"

export const BloodInventoryService = {
    findAll: async () => {
        const foundInventoryRecords = await BloodInventoryModel.find()
        .catch((error)=> { 
            console.error("There was an error finding blood inventory records: ", error);
            throw new InternalServerError("Failed to fetch blood inventories")
        })

        return foundInventoryRecords.map(record => BloodInventoryEntity.fromRecord(record));
    },

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
    },

    findByFacilityIdAndBloodType: async (facilityId: string, bloodType: DonorBloodTypes)=> {
        const inventory = await BloodInventoryModel.findOne({ facility_id: facilityId, blood_type: bloodType })
        .catch((error)=> {
            console.error("There was an error finding blood inventory record: ", error);
            throw new InternalServerError("Failed to fetch blood inventory record")
        });

        return inventory ? BloodInventoryEntity.fromRecord(inventory) : null;
    },

    updateInventory: async (inventory: {
        id: string,
        facilityId: string,
        bloodType: DonorBloodTypes,
        unitsAvailable: number
    })=> {
        const updatedInventory = await BloodInventoryModel.findByIdAndUpdate(inventory.id, { units_available: inventory.unitsAvailable }, { new: true })
        .catch((error)=> {
            console.error("There was an error updating blood inventory record: ", error);
            throw new InternalServerError("Failed to update blood inventory record")
        })

        return BloodInventoryEntity.fromRecord(updatedInventory!);
    },
}