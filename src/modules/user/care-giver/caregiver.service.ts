import { NotFoundError } from "src/shared/errors";
import { CareGiverModel } from "./caregiver.model";
// import logger from "src/insfrastructure/logger/logger";
import eventBus from "src/shared/events/event-bus";
import { CareGiverUserCreatedEvent, USER_EVENTS } from "src/shared/events/user.events";
import { CareGiverEntity } from "./care-giver.entity";

const CareGiverService = {
    create: async (userPayload: CareGiverUserCreatedEvent) => {
        try {
            console.log(`${USER_EVENTS.CREATED} event triggered for caregiver`);

            const { user_id, first_name, last_name, phone_number, address } = userPayload;

            // Create a new caregiver record
            const caregiver = await CareGiverModel.create({
                id: user_id,
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
                address: address, // Ensure this field exists in the UserModel
                is_active: true, // Default value
            });

            console.info(`Caregiver created successfully: ${caregiver._id}`);
        } catch (error) {
            console.error("Error creating caregiver:", error);
        }
    },

    getByUserId: async (id:string)=> {
        const result = await CareGiverModel.findOne({ user_id: id })
        .catch((error)=> { throw error })

        if(!result) throw new NotFoundError("Care giver not found");

        return CareGiverEntity.fromRecordToEntity(result);
    }
};

// Listen for the USER_EVENTS.CREATED event
// eventBus.on(USER_EVENTS.CREATED, CareGiverService.create);

eventBus.on(USER_EVENTS.CREATED, async (userPayload: CareGiverUserCreatedEvent) => {
    if (userPayload.role === "care_giver") { // Process only if the role is "caregiver"
        await CareGiverService.create(userPayload);
    }
});

export default CareGiverService;