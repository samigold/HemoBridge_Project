import { UserEntity } from "src/modules/user/base/user.entity";

declare global {
    namespace Express {
        interface Request {
            session: SessionEntity | null,
            user: UserEntity | null
        }
    }
}

export {};