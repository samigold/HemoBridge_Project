import { PaginationUtils } from "src/shared/utils/pagination.utils";
import { DonationScheduleEntity } from "./donation-schedule.entity";
import { DonationScheduleModel } from "./model/donation-schedule.model";
import { InternalServerError, NotFoundError, ValidationError } from "src/shared/errors";
import { DonationScheduleStatus } from "./model/donation-schedule.record";
import { BloodInventoryService } from "src/modules/health-care-facility/blood-inventory/blood-inventory.service";

export const DonationScheduleService = {
    create: async (scheduleData: Omit<DonationScheduleEntity, '_id' | 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
        const schedule = await DonationScheduleModel.create({
            donor_id: scheduleData.donorId,
            facility_id: scheduleData.facilityId,
            blood_type: scheduleData.bloodType,
            units_requested: scheduleData.unitsRequested,
            preferred_date: scheduleData.preferredDate,
            additional_notes: scheduleData.additionalNotes,
            urgency_level: scheduleData.urgencyLevel?.toLowerCase() ?? "low"

        })
        .catch((error)=> {
            console.error("Error creating donation schedule: ", error);
            throw new InternalServerError("Failed to create donation schedule");
        })
        
        return DonationScheduleEntity.fromRecord(schedule);
    },

    findByFacilityId: async(facilityId: string, page: number = 1, status?: DonationScheduleStatus) => {
        const pagination = PaginationUtils.calculatePage(page);

        let query:any = {};
        query.facility_id = facilityId;
        if(status) query.status = status

        const schedules = await DonationScheduleModel.find(query)
        .populate({
            path: 'donor_id',
            select: 'first_name last_name'
        })
        .skip(pagination.list_offset)
        .limit(pagination.results_per_page)
        .sort({ created_at: "desc" })
        .catch((error)=> {
            console.error("Error fetching facility donation schedules:", error);
            throw new InternalServerError("Failed to fetch donation schedules");
        });

        const total = await DonationScheduleModel.countDocuments({ facility_id: facilityId });

        return {
            list: schedules.map(schedule => DonationScheduleEntity.fromRecord(schedule)),
            currentPage: page,
            totalPages: Math.ceil(total / pagination.results_per_page)
        };
    },

    findByDonorId: async(donorId: string, page: number = 1, status?: DonationScheduleStatus) => {
        const pagination = PaginationUtils.calculatePage(page);
        
        let query:any = {};
        query.donor_id = donorId;
        if(status) query.status = status

        const schedules = await DonationScheduleModel.find(query)
            .populate({
                path: 'donor_id',
                select: 'first_name last_name'
            })
            .skip(pagination.list_offset)
            .limit(pagination.results_per_page)
            .sort({ created_at: "desc" })
            .catch((error)=> {
                console.error("Error fetching donor donation schedules:", error);
                throw new InternalServerError("Failed to fetch donation schedules");
            });

        const total = await DonationScheduleModel.countDocuments({ donor_id: donorId });

        return {
            list: schedules.map(schedule => DonationScheduleEntity.fromRecord(schedule)),
            currentPage: page,
            totalPages: Math.ceil(total / pagination.results_per_page)
        };
    },

    findById: async(id: string) => {
        const schedule = await DonationScheduleModel.findById(id)
        .populate({
            path: 'donor_id',
            select: 'first_name last_name'
        })
        .catch((error)=> {
            console.error("Error fetching donor donation schedule by id:", error);
            throw new InternalServerError("Failed to fetch donation schedule by id");
        });

        if(!schedule) return null

        return DonationScheduleEntity.fromRecord(schedule);
    },

    approveSchedule: async(scheduleId: string)=> {
        const schedule = await DonationScheduleModel.findById(scheduleId);
        
        if (!schedule) throw new NotFoundError('Donation schedule not found.');
    
        if (schedule.status !== DonationScheduleStatus.PENDING) {
          throw new ValidationError(`Cannot approve a donation schedule with status: ${schedule.status}`);
        }
        
        const filter = { _id: scheduleId }
        const updateObj = { status: DonationScheduleStatus.APPROVED }
        return await DonationScheduleModel.findByIdAndUpdate(filter, updateObj)
        .catch((error)=> {
            console.error("There was an error approving donation schedule: ", error);
            throw new InternalServerError("");
        })
    },

    declineSchedule: async (scheduleId: string) => {
        const schedule = await DonationScheduleModel.findById(scheduleId);
      
        if (!schedule) throw new NotFoundError('Donation schedule not found.');
      
        // if (schedule.status !== DonationScheduleStatus.PENDING) {
        //   throw new ValidationError(`Cannot decline a donation schedule with status: ${schedule.status}`);
        // }
      
        const filter = { _id: scheduleId };
        const updateObj = { 
            status: schedule.status === DonationScheduleStatus.PENDING
                    ?   DonationScheduleStatus.REJECTED 
                    :   DonationScheduleStatus.CANCELLED
        };
      
        const updatedRecord = await DonationScheduleModel.findByIdAndUpdate(filter, updateObj)
        .catch((error) => {
            console.error("There was an error declining donation schedule: ", error);
            throw new InternalServerError("");
        });
        
        if(!updatedRecord) throw new InternalServerError("");
        
        return DonationScheduleEntity.fromRecord(updatedRecord)
    },

    assignDonor: async(scheduleId: string, userId: string)=> {
        const schedule = await DonationScheduleModel.findById(scheduleId)
        .catch((error)=> {
            console.error("There was an error assigning donor to this donation request : ", error);
            throw new InternalServerError("");
        })
        
        if (!schedule) throw new NotFoundError('Donation schedule not found.');
    
        if (schedule.status === DonationScheduleStatus.APPROVED) {
          throw new ValidationError(`Donation request already has a donor`);
        }
        
        const filter = { _id: scheduleId }
        const updateObj = { donorId: userId }
        const record =  await DonationScheduleModel.findByIdAndUpdate(filter, updateObj)
        .catch((error)=> {
            console.error("There was an error assigning donor to this donation request : ", error);
            throw new InternalServerError("");
        })

        if(!record) throw new NotFoundError("There was an error ");

        return DonationScheduleEntity.fromRecord(record)
    },

    completeSchedule: async (scheduleId: string) => {
        const schedule = await DonationScheduleModel.findById(scheduleId);

        if (!schedule) throw new NotFoundError('Donation schedule not found.');

        if (schedule.status !== DonationScheduleStatus.APPROVED){
            throw new ValidationError(`Cannot complete a donation schedule with status: ${schedule.status}. Only Approved schedules can be completed.`);
        }

        const filter = { _id: scheduleId };
        const updateObj = { status: DonationScheduleStatus.COMPLETED };

        const updatedRecord = await DonationScheduleModel.findByIdAndUpdate(filter, updateObj)
        .catch((error) => {
            console.error("There was an error completing donation schedule: ", error);
            throw new InternalServerError("Failed to complete donation schedule");
        });

        if(!updatedRecord) throw new InternalServerError("Failed to complete donation schedule");

        //update Blood inventory
        try {
            // Find the blood inventory record for the facility and blood type
            const inventoryRecord = await BloodInventoryService.findByFacilityIdAndBloodType(
                schedule.facility_id.toString(),
                schedule.blood_type
            );

            if(inventoryRecord) {
                //Update existing blood inventory record
                await BloodInventoryService.updateInventory({
                    id: inventoryRecord.id,
                    facilityId: schedule.facility_id.toString(),
                    bloodType: schedule.blood_type,
                    unitsAvailable: inventoryRecord.unitsAvailable + schedule.units_requested
                });
            } else {
                //Create new blood inventory record
                await BloodInventoryService.create({
                    facilityId: schedule.facility_id.toString(),
                    bloodType: schedule.blood_type,
                    unitsAvailable: schedule.units_requested
                });
            }
        } catch (error) {
            console.error("Error updating blood inventory: ", error);
        }

        return DonationScheduleEntity.fromRecord(updatedRecord);

    }
}