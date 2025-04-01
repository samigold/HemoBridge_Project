import { UserRecord } from "./model/user.record";

interface UserEntity {
    id: string;
    isActive: boolean;
    isSuspended: boolean;
    email: string;
    passwordHash: string;
    role: string;
    firstName: string;
    lastName: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const UserEntity:UserEntity|null = {
    id: "",
    isActive: false,
    isSuspended: false,
    email: "",
    passwordHash: "",
    role: "",
    firstName: "",
    lastName: "",
    createdAt: undefined,
    updatedAt: undefined
}

export function fromRecordToEntity(record: UserRecord) {
    return Object.assign(record, UserEntity);
}