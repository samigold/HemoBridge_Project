import { NotFoundError } from "src/shared/errors";
import { FacilityEntity } from "./facility.entity";
import { ICreateFacility } from "./facility.types";
import { FacilityModel } from "./model/facility.model";
import { PaginationUtils } from "src/shared/utils/pagination.utils";

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
    },

    findPaginated: async function(page: number) {
        
        const pagination = PaginationUtils.calculatePage(page);

        const createdFacilityRecords = await FacilityModel.find({ })
        .skip(pagination.list_offset)
        .limit(pagination.results_per_page)
        .sort({ created_at: "desc" })
        .catch((error)=> {
            console.error("There was an error creating health care facility: ", error);
            throw error
        })

        const total = await this.countFacilities()
        .catch(()=> {  })

        return {
            list: createdFacilityRecords.map(record => FacilityEntity.fromRecordToEntity(record)),
            currentPage: page,
            totalPages: total
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
        const createdFacilityRecord = await FacilityModel.findOne({ id })
        .catch((error)=> {
            console.error("There was an error creating health care facility: ", error);
            throw error
        })

        if(!createdFacilityRecord) throw new NotFoundError("Facility not found or id is invalid, please try again");

        return FacilityEntity.fromRecordToEntity(createdFacilityRecord);
    }
}