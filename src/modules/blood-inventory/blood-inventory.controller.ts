import { Request, Response } from 'express';
import { BloodInventoryService } from './blood-inventory.service';
import { UserService } from '../user/base/user.service';
import { FacilityStaffService } from '../health-care-facility/facility-staff/facility-staff.service';
import { FacilityService } from '../health-care-facility/base/facility.service';

export const BloodInventoryController = {
    create: async (req: Request, res: Response) => {

        // Check if the user is logged in
        const userId = req.session.userId;

        const { blood_type, stock_level, urgency_level } = req.body;

        if (!blood_type || !stock_level || !urgency_level) {
            res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user is a facility staff member
        const facilityId = await FacilityStaffService.getFacilityIdByStaffId(userId);


        const facility = await FacilityService.findById(facilityId);
        if (!facility) {
            res.status(404).json({ message: 'Facility not found' });
        }

        const address = facility?.address || "Unknown Address";
        

            const bloodInventory = await BloodInventoryService.create({
                facility_id : facilityId,
                blood_type,
                stock_level,
                urgency_level,
                location : address,
            });

            res.status(201).json({"message": "Blood inventory created successfully", "data": bloodInventory});
    }
}