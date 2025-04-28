import { Request, Response } from "express";
import { DonationScheduleService } from "./donation-schedule.service";
import { ValidationError, InternalServerError } from "src/shared/errors";

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
    }
};
