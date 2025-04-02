import { DonorModel } from "./donor.model";
import logger from "src/insfrastructure/logger/logger";
import eventBus from "src/shared/events/event-bus";
import { USER_EVENTS, UserCreatedEvent } from "src/shared/events/user.events";

const DonorService = {
    create: async (userPayload: UserCreatedEvent) => {
        try {
            console.log(`${USER_EVENTS.CREATED} event triggered`);
            console.log(userPayload);

            // Extract user details from the payload
            const { user_id, email, first_name, last_name, phone_number ,blood_type } = userPayload;


            // Create a new donor record
            const donor = await DonorModel.create({
                id: user_id,
                email: email,
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
                blood_type: blood_type, // Ensure this field exists in the UserModel
                is_eligible: true, // Default value
                last_donation_date: null, // Default value
                next_eligible_date: null, // Default value
                medical_history: {} // Default value
            });

            logger.info(`Donor created successfully: ${donor._id}`);
        } catch (error) {
            logger.error("Error creating donor:", error);
        }
    }
};

// Listen for the USER_EVENTS.CREATED event
eventBus.on(USER_EVENTS.CREATED, DonorService.create);

export default DonorService;