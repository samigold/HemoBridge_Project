import { Request, Response } from "express";
import { DonationScheduleService } from "./donation-schedule.service";
import { ValidationError, InternalServerError, NotFoundError } from "src/shared/errors";
import { FacilityStaffService } from "src/modules/health-care-facility/facility-staff/facility-staff.service";
import { USER_ROLE } from "src/shared/constants/user-role.enum";
export const DonationScheduleController = {
    create: async(req: Request, res: Response) => {
        let { 
            donorId,
            facilityId,
            bloodType,
            unitsRequested,
            additionalNotes,
            preferredDate,
            urgencyLevel
            
        } = req.body;

        if(req.user!.role === USER_ROLE.DONOR) {
            // Validate required fields
            if(!donorId || !facilityId || !bloodType || !preferredDate) {
                throw new ValidationError("Required fields missing");
            }
        }

        if(req.user!.role === USER_ROLE.FACILITY_STAFF) {
            // Validate required fields
            if(!bloodType || !preferredDate) {
                throw new ValidationError("Required fields missing");
            }

            facilityId = req.user!.id
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

    fetchDonorSchedules: async(req: Request, res: Response) => {
        const { page } = req.query;
        const { id } = req.user!; // from auth middleware

        const schedules = await DonationScheduleService.findByDonorId(
            id,
            Number(page) || 1
        );

        res.status(200).json({
            success: true,
            message: "Donation schedules retrieved successfully",
            data: schedules
        });
    },

    fetchFacilitySchedules: async(req: Request, res: Response) => {
        const { page } = req.query;
        const { id } = req.user!; // from auth middleware

        // Get facility ID for staff member
        const staffProfile = await FacilityStaffService.getByUserId(id)
        .catch(error => {
            console.error("Error finding facility staff profile:", error);
            throw new InternalServerError("Error retrieving facility information");
        });

        if (!staffProfile) {
            throw new ValidationError("Invalid facility staff profile");
        }

        const schedules = await DonationScheduleService.findByFacilityId(staffProfile.facilityId, Number(page) || 1)
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
      
        const update = await DonationScheduleService.assignDonor(donationScheduleId as string, req.user!.id)
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
