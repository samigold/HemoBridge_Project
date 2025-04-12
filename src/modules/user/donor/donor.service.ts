import { DonorModel } from "./model/donor.model";
import eventBus from "src/shared/events/event-bus";
import { DonorUserCreatedEvent, USER_EVENTS } from "src/shared/events/user.events";
import { DonorEntity } from "./donor.entity";
import { InternalServerError, NotFoundError } from "src/shared/errors";

const DonorService = {
    create: async (userPayload: DonorUserCreatedEvent) => {
        await DonorModel.create({
            user_id: userPayload.user_id,
            first_name: userPayload.first_name,
            last_name: userPayload.last_name,
            phone_number: userPayload.phone_number,
            blood_type: userPayload.blood_type,
            is_eligible: true,
            last_donation_date: null,
            next_eligible_date: null

        }).catch((error)=> {
            console.error("There was an error creating donor profile: ", error);
            throw new InternalServerError("There was an error creating donor profile");
        })

        return;
    },

    getByUserId: async (id:string)=> {
        const result = await DonorModel.findOne({ user_id: id })
        .catch((error)=> { throw error })
        
        if(!result) throw new NotFoundError("Donor profile not found");

        return DonorEntity.fromRecordToEntity(result)
    }
};

// Listen for the USER_EVENTS.CREATE,l   D event
// eventBus.on(USER_EVENTS.CREATED, DonorService.create);

eventBus.on(USER_EVENTS.CREATED, async (userPayload: DonorUserCreatedEvent) => {
    if (userPayload.role === "donor") { // Process only if the role is "donor"
        await DonorService.create(userPayload)
    }
});

export default DonorService;