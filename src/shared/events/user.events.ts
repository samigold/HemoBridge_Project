export enum USER_EVENTS {
    CREATED = "user_created"
}

export interface UserCreatedEvent {
    user_id: string;
}