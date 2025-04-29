import { Request, Response } from "express";
import { InternalServerError, ValidationError } from "src/shared/errors";
import { BloodInventoryService } from "./blood-inventory.service";

export const BloodInventoryController = {
    fetchAll: async(req: Request, res: Response)=> {
        if(!req.params.facilityId) throw new ValidationError("");

        const inventories = await BloodInventoryService.findByFacilityId(req.params.facilityId)
        .catch((error)=> {
            console.error("Error fetching blood inventories:", error);
            throw new InternalServerError("Failed to fetch blood inventories");
        });

        res.status(200).json({
            success: true,
            message: "Blood inventories retrieved successfully",
            data: inventories
        });
    }
}