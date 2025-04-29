import { Request, Response } from "express";
import { DonationScheduleService } from "./donation-schedule.service";
import { ValidationError, InternalServerError, NotFoundError } from "src/shared/errors";
import { FacilityStaffService } from "src/modules/health-care-facility/facility-staff/facility-staff.service";
export const DonationScheduleController = {
    create: async(req: Request, res: Response) => {
        const { 
            donorId,
            facilityId,
            bloodType,
            unitsRequested,
            additionalNotes,
            preferredDate
            
        } = req.body;

        // Validate required fields
        if(!donorId || !facilityId || !bloodType || !preferredDate) {
            throw new ValidationError("Required fields missing");
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
            preferredDate: dateObj

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
        const { donationScheduleId } = req.query;

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
        const { donationScheduleId } = req.query;
      
        const foundDonationScheduleRecord = await DonationScheduleService.findById(donationScheduleId as string)
        .catch(() => { throw new InternalServerError("") });
      
        if (!foundDonationScheduleRecord) throw new NotFoundError("Donation schedule not found");
      
        await DonationScheduleService.declineSchedule(donationScheduleId as string)
        .catch((error) => {
            if (error) throw error;
            throw new InternalServerError("");
        });
      
        res.status(200).json({
          success: true,
          message: "Donation schedule declined successfully",
        });
      }
};
