import eventBus from "src/shared/events/event-bus"
import { USER_EVENTS, UserCreatedEvent } from "src/shared/events/user.events";

const DonorService = {
    create: (userPayload: UserCreatedEvent)=> {
        console.log(`${USER_EVENTS.CREATED} event triggered`)
        console.log(userPayload)
        // TODO: create a new donor record
    }
}

eventBus.on(USER_EVENTS.CREATED, DonorService.create);

export default DonorService