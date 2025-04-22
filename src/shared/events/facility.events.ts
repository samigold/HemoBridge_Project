export enum FACILITY_EVENTS {
    CREATED = "facility_created"
}

export interface FacilityCreatedEvent {
    facility_id: string
    personnel: {
        email: string;
        phone_number: string;
        password: string;
        first_name: string;
        last_name: string;
    }
}