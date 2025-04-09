import { Request, Response } from "express";
import { ValidationError } from "src/shared/errors";
import { FacilityStaffService } from "./facility-staff.service";

export const FacilityStaffController = {
    create: async(req: Request, res: Response)=> {

        const { name, address, email, phoneNumber, operationalHours } = req.body;

        if(!name || !address || !email || !phoneNumber || !operationalHours) {
            throw new ValidationError("All fields are required");
        }

        const createdFacilityRecord = await FacilityStaffService.create({
            name,
            address,
            email,
            phoneNumber,
            operationalHours
        
        }).catch((error)=> {
            console.error("There was an error creating health care facility: ", error);
            throw error
        })

        res.status(201).json({
            success: true,
            message: "New health care facility created successfully",
            data: createdFacilityRecord
        });
    }
}