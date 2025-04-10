import { Request, Response } from "express";
import { FacilityStaffService } from "./facility-staff.service";
import { InternalServerError, NotFoundError, ValidationError } from "src/shared/errors";
import { FacilityService } from "../base/facility.service";

export const FacilityStaffController = {
    fetch: async(req: Request, res: Response)=> {

        const { page, facilityId } =  req.params;
        
        if(!page || isNaN(Number(page))) throw new ValidationError("Page number is required to fetch this list");
        if(!facilityId) throw new ValidationError("Facility id required to fetch this list");

        const foundFacility = await FacilityService.findById(facilityId)
        .catch(()=> {
            throw new InternalServerError("There was an error fetching health care facility list");
        })

        if(!foundFacility) throw new NotFoundError("Invalid facility id");

        const foundPaginatedResults = await FacilityStaffService.findPaginated(facilityId, Number(page))
        .catch((error)=> {
            console.error("There was an error fetching health care facility list: ", error);
            throw new InternalServerError("There was an error fetching health care facility list");
        })

        res.status(201).json({
            success: true,
            message: "Health care facility staffs retrieved successfully",
            data: foundPaginatedResults
        });
    },
}