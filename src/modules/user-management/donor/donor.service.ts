import { DonorModel } from "./donor.model";
// import logger from "src/insfrastructure/logger/logger";
import eventBus from "src/shared/events/event-bus";
import { DonorUserCreatedEvent, USER_EVENTS } from "src/shared/events/user.events";

const DonorService = {
    create: async (userPayload: DonorUserCreatedEvent) => {
        
        try {
            // Extract user details from the payload
            const { user_id, first_name, last_name, phone_number, blood_type } = userPayload;


            // Create a new donor record
            const donor = await DonorModel.create({
                id: user_id,
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
                blood_type: blood_type, // Ensure this field exists in the UserModel
                is_eligible: true, // Default value
                last_donation_date: null, // Default value
                next_eligible_date: null, // Default value
                medical_history: {} // Default value
            });

            console.info(`Donor created successfully: ${donor._id}`);
        } catch (error) {
            console.error("Error creating donor:", error);
        }
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