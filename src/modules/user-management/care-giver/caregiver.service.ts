import { CareGiverModel } from "./caregiver.model";
import logger from "src/insfrastructure/logger/logger";
import eventBus from "src/shared/events/event-bus";
import { USER_EVENTS, UserCreatedEvent } from "src/shared/events/user.events";

const CareGiverService = {
    create: async (userPayload: UserCreatedEvent) => {
        try {
            console.log(`${USER_EVENTS.CREATED} event triggered for caregiver`);

            const { user_id, email, first_name, last_name, phone_number, address } = userPayload;

            // Create a new caregiver record
            const caregiver = await CareGiverModel.create({
                id: user_id,
                email: email,
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
                address: address, // Ensure this field exists in the UserModel
                is_active: true, // Default value
            });

            logger.info(`Caregiver created successfully: ${caregiver._id}`);
        } catch (error) {
            logger.error("Error creating caregiver:", error);
        }
    }
};

// Listen for the USER_EVENTS.CREATED event
// eventBus.on(USER_EVENTS.CREATED, CareGiverService.create);

eventBus.on(USER_EVENTS.CREATED, async (userPayload: UserCreatedEvent) => {
    if (userPayload.role === "care_giver") { // Process only if the role is "caregiver"
        await CareGiverService.create(userPayload);
    }
});

export default CareGiverService;