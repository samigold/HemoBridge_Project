import { SessionEntity } from "./session.entity";
import { AuthHelper } from "../helpers/auth.helper";
import { TokenPayload } from "./session.types";
import SessionModel from "./model/session.model";

export const SessionService = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 3600,

    async renewSessionTokens (sessionId:string, userId:string) {
        const tokenPayload: TokenPayload = {
            userId
        }

        const query = { id: sessionId }
        const update = { $set: {
            access_token: AuthHelper.generateToken(tokenPayload, this.ACCESS_TOKEN_SECRET , this.ACCESS_TOKEN_EXPIRES_IN),
        } }

        const result = await SessionModel.findOneAndUpdate(query, update)
        .catch((error)=> { 
            console.error("There was an error updating session tokens: ", error);
            throw error
        })

        if(!result) return null
        
        return SessionEntity.fromRecordToEntity(result);
    },

    async revokeSession(userId:string): Promise<SessionEntity|null> {
        const query = { user_id: userId, revoked: false }
        const update = { 
            $set: {
                revoked: true
            }
        }

        const foundSession = await SessionModel.findOneAndUpdate(query, update)
        .catch((error)=> { 
            console.error("There was an error revoking session \n", error)
            throw error 
        })

        if(!foundSession) return null

        return SessionEntity.fromRecordToEntity(foundSession);
    },

    async findUserActiveSession(userId:string): Promise<SessionEntity|null> {
        const foundSession = await SessionModel.findOne({ user_id: userId, revoked: false })
        .catch((error)=> { 
            console.error("There was an error fetching session by access token \n", error)
            throw error 
        })

        if(!foundSession) return null

        return SessionEntity.fromRecordToEntity(foundSession);
    },

    async add (userId:string): Promise<SessionEntity|null> {
        const payload = {
            userId
        }

        const result = await SessionModel.create({
            user_id: userId,
            access_token: AuthHelper.generateToken(payload, this.ACCESS_TOKEN_SECRET , this.ACCESS_TOKEN_EXPIRES_IN),

        }).catch((error)=> { 
            console.error("There was an error creating a new session", error);
            throw error 
        })

        if(!result) return null

        return SessionEntity.fromRecordToEntity(result);
    },

    async findSessionByAccessToken(accessToken:string): Promise<SessionEntity|null> {
        const foundSession = await SessionModel.findOne({ access_token: accessToken })
        .catch((error)=> { 
            console.error("There was an error fetching session by access token \n", error)
            throw error 
        })

        if(!foundSession) return null

        return SessionEntity.fromRecordToEntity(foundSession);
    }
}