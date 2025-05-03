import { Request, Response } from "express";
import { DonationScheduleService } from "./donation-schedule.service";
import { ValidationError, InternalServerError, NotFoundError } from "src/shared/errors";
import { FacilityStaffService } from "src/modules/health-care-facility/facility-staff/facility-staff.service";
import { USER_ROLE } from "src/shared/constants/user-role.enum";
import { DonationScheduleCreator, DonationScheduleStatus } from "./model/donation-schedule.record";
import { ProfileService } from "src/modules/user/profile/profile.service";

export const DonationScheduleController = {
    create: async(req: Request, res: Response) => {
        let { 
            donorId,
            facilityId,
            bloodType,
            unitsRequested,
            additionalNotes,
            preferredDate,
            urgencyLevel,
            createdBy
            
        } = req.body;

        if(req.user!.role === USER_ROLE.DONOR) {
            // Validate required fields
            if(!donorId || !facilityId || !bloodType || !preferredDate) {
                throw new ValidationError("Required fields missing");
            }

            createdBy = DonationScheduleCreator.DONOR;
        }

        if(req.user!.role === USER_ROLE.FACILITY_STAFF) {
            // Validate required fields
            if(!bloodType || !preferredDate) {
                throw new ValidationError("Required fields missing");
            }

            const facilityStaff = await FacilityStaffService.getByUserId(req.user!.id)

            facilityId = facilityStaff.facilityId
            createdBy = DonationScheduleCreator.FACILITY_STAFF;
        }

        // Clean and validate date format
        const cleanDateStr = preferredDate.trim();
        const dateObj = new Date(cleanDateStr);
        if(dateObj.toString() === 'Invalid Date') {
            throw new ValidationError("Invalid date format. Please use YYYY-MM-DD HH:mm format");
        }
        
        // Set time to start of hour to ensure consistent format
        dateObj.setMinutes(0);
        dateObj.setSeconds(0);
        dateObj.setMilliseconds(0);

        // Ensure date is in the future
        if(dateObj <= new Date()) {
            throw new ValidationError("Preferred date must be in the future");
        }

        const schedule = await DonationScheduleService.create({
            donorId,
            facilityId, 
            createdBy,
            bloodType,
            unitsRequested: unitsRequested || 1,
            additionalNotes,
            preferredDate: dateObj,
            urgencyLevel

        }).catch((error)=> {
            console.error("Error creating donation schedule:", error);
            throw new InternalServerError("Failed to create donation schedule");
        });

        res.status(201).json({
            success: true,
            message: "Donation schedule created successfully", 
            data: schedule
        });
    },

    fetchSchedulesByCreator: async(req: Request, res: Response) => {
        const { page, status, creator } = req.query;

        const requestStatus = status as DonationScheduleStatus;
        let requestCreator = creator as DonationScheduleCreator;

        if(!creator) {
            throw new ValidationError(`Invalid donation schedule creator ${Object.values(DonationScheduleCreator).join(", ")}`);
        }

        if(status !== "undefined") {
            if(!Object.values(DonationScheduleStatus).includes(requestStatus)) {
                throw new ValidationError("Invalid donation schedule status");
            }
        }

        // if the user is requesting schedules created by a donor and the user is a donor: query the list by user id.
        // if the user is requesting schedules created by donors and the user is a facility_staff: query the list the facility id.
        // if the user is requesting schedules created by facility_staff and the user is a donor: query the list by facility id.

        let donorId = undefined, facilityId = undefined;

        if(req.user?.role === USER_ROLE.DONOR && creator === DonationScheduleCreator.DONOR) {
            donorId = req.user.id
        }

        if(req.user?.role === USER_ROLE.FACILITY_STAFF) {
            // Get facility ID for staff member
            const staffProfile = await FacilityStaffService.getByUserId(req.user.id)
            .catch(error => {
                console.error("Error finding facility staff profile:", error);
                throw new InternalServerError("Error retrieving facility information");
            });
            
            facilityId = staffProfile.facilityId
        }

        const schedules = await DonationScheduleService.find({
            creator: requestCreator, 
            status: requestStatus,
            page: Number(page) || 1,
            donorId,
            facilityId

        }).catch(()=> { throw new InternalServerError("") })

        res.status(200).json({
            success: true,
            message: "Donation schedules retrieved successfully",
            data: schedules
        });
    },

    fetchDonorSchedules: async(req: Request, res: Response) => {
        const { page, status, creator } = req.query;
        const { id, role } = req.user!; // from auth middleware

        const requestStatus = status as DonationScheduleStatus
        let requestCreator = false;

        if(creator !== null && creator === "true") {
            requestCreator = true
        }

        if(status !== "undefined") {
            if(!Object.values(DonationScheduleStatus).includes(requestStatus)) {
                throw new ValidationError("Invalid donation schedule status");
            }
        }

        const donorProfile = await ProfileService.getProfileByRole({id, role })
        .catch(()=> { throw new InternalServerError("") })

        const schedules = await DonationScheduleService.findByDonorId({
            donorId: donorProfile.id,
            page: Number(page) || 1,
            status: requestStatus,
            creator: requestCreator

        }).catch(()=> { throw new InternalServerError("") })

        res.status(200).json({
            success: true,
            message: "Donation schedules retrieved successfully",
            data: schedules
        });
    },

    fetchFacilitySchedules: async(req: Request, res: Response) => {
        const { page, creator } = req.query;
        const { id } = req.user!; // from auth middleware

        let requestCreator = false;

        if(creator !== null && creator === "true") {
            requestCreator = true
        }

        // Get facility ID for staff member
        const staffProfile = await FacilityStaffService.getByUserId(id)
        .catch(error => {
            console.error("Error finding facility staff profile:", error);
            throw new InternalServerError("Error retrieving facility information");
        });

        if (!staffProfile) {
            throw new ValidationError("Invalid facility staff profile");
        }

        const schedules = await DonationScheduleService.findByFacilityId({
            facilityId: staffProfile.facilityId, 
            page: Number(page) || 1,
            creator: requestCreator
        })
        .catch(error => {
            console.error("Error finding facility donation schedules :", error);
            throw new InternalServerError("Error retrieving facility donation schedules");
        });

        res.status(200).json({
            success: true,
            message: "Donation schedules retrieved successfully",
            data: schedules
        });
    },

    approve: async(req: Request, res: Response)=> {
        const { donationScheduleId } = req.params;

        if(!donationScheduleId) throw new ValidationError("Invalid donation schedule id");

        const foundDonationScheduleRecord = await DonationScheduleService.findById(donationScheduleId as string)
        .catch(()=> { throw new InternalServerError("") });

        if(!foundDonationScheduleRecord) throw new NotFoundError("Donation schedule not found");
        if(foundDonationScheduleRecord.createdBy !== DonationScheduleCreator.DONOR) {
            throw new NotFoundError("Donation schedule can't be approved by a facility if it was not created by a donor");
        }

        await DonationScheduleService.approveSchedule(donationScheduleId as string)
        .catch((error)=> { 
           if(error) throw error 
           throw new InternalServerError("")
        });

        res.status(200).json({
            success: true,
            message: "Donation schedule accepted successfully"
        });
    },

    decline: async (req: Request, res: Response) => {
        const { donationScheduleId } = req.params;
      
        const foundDonationScheduleRecord = await DonationScheduleService.findById(donationScheduleId as string)
        .catch(() => { throw new InternalServerError("") });
      
        if (!foundDonationScheduleRecord) throw new NotFoundError("Donation schedule not found");
      
        const update = await DonationScheduleService.declineSchedule(donationScheduleId as string)
        .catch((error) => {
            if (error) throw error;
            throw new InternalServerError("");
        });
      
        res.status(200).json({
            success: true,
            message: `Donation schedule ${update.status.toLowerCase()} successfully`,
        });
    },

    assignDonor: async(req: Request, res: Response)=> {
        const { donationScheduleId } = req.params;
        const { preferredDate } = req.body;
        const { id, role } = req.user!; // from auth middleware

        if(!preferredDate) throw new ValidationError("Please provide a preferred date");

        // Clean and validate date format
        const cleanDateStr = preferredDate.trim();
        const dateObj = new Date(cleanDateStr);
        if(dateObj.toString() === 'Invalid Date') {
            throw new ValidationError("Invalid date format. Please use YYYY-MM-DD HH:mm format");
        }
        
        // Set time to start of hour to ensure consistent format
        dateObj.setMinutes(0);
        dateObj.setSeconds(0);
        dateObj.setMilliseconds(0);

        // Ensure date is in the future
        if(dateObj <= new Date()) {
            throw new ValidationError("Preferred date must be in the future");
        }

        const donorProfile = await ProfileService.getProfileByRole({id, role })
        .catch(()=> { throw new InternalServerError("") })
      
        const update = await DonationScheduleService.assignDonor(
            donationScheduleId as string, 
            donorProfile.id, 
            dateObj
        )
        .catch((error) => {
            if (error) throw error;
            throw new InternalServerError("");
        });
      
        res.status(200).json({
            success: true,
            message: `Assigned to donation schedule request successfully`,
            data: update
        });
    },

    complete: async(req: Request, res: Response) => {
        const { donationScheduleId } = req.params;

        if(!donationScheduleId) throw new ValidationError("Invalid donation schedule id");

        const foundDonationScheduleRecord = await DonationScheduleService.findById(donationScheduleId as string)
        .catch(()=>{ throw new InternalServerError("Error finding donation schedule") });

        if(!foundDonationScheduleRecord) throw new NotFoundError("Donation schedule not found");

        const updatedSchedule = await DonationScheduleService.completeSchedule(donationScheduleId as string)
        .catch((error)=> {
            if(error) throw error;
            throw new InternalServerError("Error completing donation schedule")
        });

        res.status(200).json({
            success: true,
            message: "Donation schedule completed successfully",
            data: updatedSchedule
        });
    },
};
