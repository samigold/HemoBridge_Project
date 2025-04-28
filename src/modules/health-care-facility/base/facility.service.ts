import { InternalServerError, NotFoundError } from "src/shared/errors";
import { FacilityEntity } from "./facility.entity";
import { ICreateFacility } from "./facility.types";
import { FacilityModel } from "./model/facility.model";
import { PaginationUtils } from "src/shared/utils/pagination.utils";
import { BloodInventoryService } from "../blood-inventory/blood-inventory.service";

export const FacilityService = {
    create: async(newFacility: ICreateFacility)=> {
        const createdFacilityRecord = await FacilityModel.create({
            name: newFacility.name,
            address: newFacility.address,
            operational_hours: newFacility.operationalHours,
            blood_types: newFacility.bloodTypes
            // contact_info: {
            //     email: newFacility.email,
            //     phone_number: newFacility.phoneNumber
            // },
        
        }).catch((error)=> {
            console.error("There was an error creating health care facility: ", error);
            throw error
        })

        return FacilityEntity.fromRecordToEntity(createdFacilityRecord);
    },

    findPaginated: async function(page: number) {
        
        const pagination = PaginationUtils.calculatePage(page);

        const facilityRecords = await FacilityModel.find({ })
        .skip(pagination.list_offset)
        .limit(pagination.results_per_page)
        .sort({ created_at: "desc" })
        .catch((error)=> {
            console.error("There was an error fetching health care facility: ", error);
            throw error
        })

        const total = await this.countFacilities()
        .catch(()=> { throw new InternalServerError("") })

        const facilityWithInventoryRecords = [];

        // fetch lowest stock level in inventory
        for await (const facilityRecord of facilityRecords) {
            const inventories = await BloodInventoryService.findByFacilityId(facilityRecord.id)
            .catch(()=> {  })

            let high, medium, low;

            if(inventories) {
                high = inventories.some(item => item.unitsAvailable <= 1) 
                medium = inventories.some(item => item.unitsAvailable <= 6) 
                low = inventories.some(item => item.unitsAvailable > 6)
            }

            facilityWithInventoryRecords.push({
                ...FacilityEntity.fromRecordToEntity(facilityRecord),
                urgency: high ? "high"
                            : medium ? "medium" 
                            : "low"
            })

        }
        // createdFacilityRecords.map(record => ({
        //     ...FacilityEntity.fromRecordToEntity(record),
        //     urgency: 
        // }))

        return {
            list: facilityWithInventoryRecords,
            currentPage: page,
            totalPages: Math.ceil(total / pagination.results_per_page)
        }
    },

    countFacilities: async()=> {
        return FacilityModel.countDocuments()
        .catch((error)=> { 
            console.error("There was an error counting facility documents", error);
            throw error
        })
    },

    findById: async(id: string)=> {
        const createdFacilityRecord = await FacilityModel.findById(id)
        .catch((error)=> {
            console.error("There was an error creating health care facility: ", error);
            throw error
        })

        if(!createdFacilityRecord) return createdFacilityRecord

        return FacilityEntity.fromRecordToEntity(createdFacilityRecord);
    }
}