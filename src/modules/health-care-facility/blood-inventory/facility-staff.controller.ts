import { Request, Response } from "express";
import { InternalServerError, ValidationError } from "src/shared/errors";
import { BloodInventoryService } from "./blood-inventory.service";
import { DonorBloodTypes } from "src/modules/user/donor/model/donor.record";

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
    },

    updateInventory: async(req: Request, res: Response)=> {
        const { inventoryId } = req.params;

        const { facilityId, bloodType, unitsAvailable } = req.body;

        if(!inventoryId) {
            throw new ValidationError("Inventory ID is required");
        }

        if(!facilityId) {
            throw new ValidationError("Facility ID is required");
        }

        if(!bloodType || !Object.values(DonorBloodTypes).includes(bloodType)) {
            throw new ValidationError("Invalid blood type provided");
        }

        if(unitsAvailable === undefined || isNaN(unitsAvailable) || Number(unitsAvailable) < 0) {
            throw new ValidationError("Invalid units available provided");
        }

        //check if inventory exists
        const inventoryExists = await BloodInventoryService.findByFacilityIdAndBloodType(facilityId, bloodType as DonorBloodTypes)
        .catch((error)=> {
            console.error("Error checking if inventory exists:", error);
            throw new InternalServerError("Failed to check if inventory exists");
        });

        if(!inventoryExists) {
            throw new ValidationError("Inventory does not exist for the provided facility and blood type");
        }

        if(inventoryExists.id !== inventoryId) {
            throw new ValidationError("Inventory ID does not match the provided facility and blood type");
        }

        //update inventory
        const updatedInventory = await BloodInventoryService.updateInventory({
            id: inventoryId,
            facilityId,
            bloodType: bloodType as DonorBloodTypes,
            unitsAvailable: Number(unitsAvailable)
        })
        .catch((error)=> {
            console.error("Error updating inventory:", error);
            throw new InternalServerError("Failed to update blood inventory");
        });

        //return response
        res.status(200).json({
            success: true,
            message: "Blood inventory updated successfully",
            data: updatedInventory
        });
    }
}