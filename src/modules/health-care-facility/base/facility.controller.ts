import { Request, Response } from "express";
import { FacilityService } from "./facility.service";
import { InternalServerError, NotFoundError, ValidationError } from "src/shared/errors";
import eventBus from "src/shared/events/event-bus";
import { FACILITY_EVENTS, FacilityCreatedEvent } from "src/shared/events/facility.events";
import { fetchLocalDB } from "src/shared/helpers/local-db.helper";
import { BloodInventoryService } from "../blood-inventory/blood-inventory.service";

export const FacilityController = {
    create: async(req: Request, res: Response)=> {

        const { 
            facilityName,
            operationalHours,
            address,
            bloodTypes,
            personnelFirstname,
            personnelLastname,
            personnelEmail,
            personnelPhoneNumber,
            personnelPassword

        } = req.body;

        if(!facilityName ||
            !operationalHours ||
            !address ||
            !bloodTypes ||
            !bloodTypes.length ||
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
            operationalHours: operationalHours ?? "9AM to 5PM",
            bloodTypes: bloodTypes
        
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
    },

    createFromLocalDB: async (req: Request, res: Response)=> {
        const data = await fetchLocalDB()
        .catch((error)=> {
            console.log("There was an error fetching local db: ", error);
            throw new InternalServerError("")
        })

        if(!data.facilities || !data.facilities.length) throw new NotFoundError("Facilities not found in local db");

        for await (const facility of data.facilities) {
            // Create the facility
            const createdFacilityRecord = await FacilityService.create({
                name: facility.name,
                address: facility.address,
                operationalHours: facility.hours ?? "9AM to 5PM",
                bloodTypes: facility.bloodType

            
            }).catch((error)=> {
                console.error("There was an error creating health care facility: ", error);
                throw error
            })

            for await (const stock of facility.stock) {
                await BloodInventoryService.create({
                    facilityId: createdFacilityRecord.id,
                    bloodType: stock.type,
                    unitsAvailable: stock.stock
                }).catch((error)=> {
                    console.error("There was an error creating a blood inventory for health care facility: ", error);
                    throw error
                })
            }

            // create the facility staff
            const newFacilityCreatedPayload: FacilityCreatedEvent = {
                facility_id: createdFacilityRecord.id,
                personnel: {
                    email: `demo-staff@${facility.name.replace(/ /g, "-")}.com`.toLowerCase(),
                    phone_number: "8012345678",
                    password: "1234567890",
                    first_name: "demo",
                    last_name: "staff"
                }
            }
    
            eventBus.emit(FACILITY_EVENTS.CREATED, newFacilityCreatedPayload);
        }

        res.status(201).json({
            success: true,
            message: "New Facilities created from local db successfully"
        });
    }
}