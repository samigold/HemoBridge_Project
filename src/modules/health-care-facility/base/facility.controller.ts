import { Request, Response } from "express";
import { FacilityService } from "./facility.service";
import { ValidationError } from "src/shared/errors";

export const FacilityController = {
    create: async(req: Request, res: Response)=> {

        const { name, address, email, phoneNumber, operationalHours } = req.body;

        if(!name || !address || !email || !phoneNumber || !operationalHours) {
            throw new ValidationError("All fields are required");
        }

        const createdFacilityRecord = await FacilityService.create({
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
    },

    fetch: async(req: Request, res: Response)=> {

        const { page } =  req.params;
        if(!page || isNaN(Number(page))) throw new ValidationError("Page number is required to fetch this list");

        const foundPaginatedResults = await FacilityService.findPaginated(Number(page))
        .catch((error)=> {
            console.error("There was an error fetching health care facility list: ", error);
            throw error
        })

        res.status(201).json({
            success: true,
            message: "Health care facilities retrieved successfully",
            data: foundPaginatedResults
        });
    },

    fetchById: async(req: Request, res: Response)=> {
        
        const { id } = req.params;
        if(!id) throw new ValidationError("");

        const foundPaginatedResults = await FacilityService.findById(id)
        .catch((error)=> {
            console.error("There was an error finding health care facility by id: ", error);
            throw error
        })

        res.status(201).json({
            success: true,
            message: "Health care facilities retrieved successfully",
            data: foundPaginatedResults
        });
    }
}