import { UserEntity } from "src/modules/user-management/user/user.entity";

declare global {
    namespace Express {
        interface Request {
            session: SessionEntity | null,
            user: UserEntity | null
        }
    }
}

export {};