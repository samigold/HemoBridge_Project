import { Request, Response } from "express";
import { FacilityService } from "./facility.service";
import { ValidationError } from "src/shared/errors";
import eventBus from "src/shared/events/event-bus";
import { FACILITY_EVENTS, FacilityCreatedEvent } from "src/shared/events/facility.events";

export const FacilityController = {
    create: async(req: Request, res: Response)=> {

        const { 
            facilityName,
            operationalHours,
            address,
            personnelFirstname,
            personnelLastname,
            personnelEmail,
            personnelPhoneNumber,
            personnelPassword

        } = req.body;

        if(!facilityName ||
            !operationalHours ||
            !address ||
            !personnelFirstname ||
            !personnelLastname ||
            !personnelEmail ||
            !personnelPhoneNumber ||
            !personnelPassword) {

            throw new ValidationError("All fields are required");
        }

        const createdFacilityRecord = await FacilityService.create({
            name: facilityName,
            address: address,
            // phoneNumber,
            operationalHours: operationalHours ?? "9AM to 5PM"
        
        }).catch((error)=> {
            console.error("There was an error creating health care facility: ", error);
            throw error
        })

        const newFacilityCreatedPayload: FacilityCreatedEvent = {
            facility_id: createdFacilityRecord.id,
            personnel: {
                email: personnelEmail,
                phone_number: personnelPhoneNumber,
                password: personnelPassword,
                first_name: personnelFirstname,
                last_name: personnelLastname
            }
        }

        eventBus.emit(FACILITY_EVENTS.CREATED, newFacilityCreatedPayload);

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