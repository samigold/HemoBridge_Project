export enum USER_EVENTS {
    CREATED = "user_created"
}

export interface UserCreatedEvent {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    blood_type?: string;
    address: string;
    role: string;
}