import { Request, Response, NextFunction } from "express";
import { AuthHelper } from "src/modules/user/auth/helpers/auth.helper";
import { SessionService } from "src/modules/user/auth/session/session.service";
import { UserService } from "src/modules/user/base/user.service";
import { NotAuthenticatedError } from "../errors";

export const validateSession = async (req: Request, res: Response, next: NextFunction) => {
    
    let sessionId = req.headers.cookie;

    if(!sessionId || !sessionId.includes('session-id')) {
      throw new NotAuthenticatedError("Session ID is required.")
    }

    const allCookies = sessionId.toString().split(';');
    const tokenCookie = allCookies.filter(cookie => cookie.includes('session-id'));
    sessionId = tokenCookie[0].split('=')[1];

    if (!sessionId) {
      throw new NotAuthenticatedError("Session ID is required.")
    }

    // verify the token, check if it is a valid token and it is not expired
    const result = await AuthHelper.verifyToken(sessionId, SessionService.ACCESS_TOKEN_SECRET)
    .catch(()=> { throw new NotAuthenticatedError("Session is revoked. Please log in again.") })

    // check which session this token belongs to
    const foundSession = await SessionService.findSessionByAccessToken(sessionId as string)
    .catch(()=> { throw new NotAuthenticatedError("Session is revoked. Please log in again")  })

    // check if it is an active session
    if (!foundSession || foundSession.revoked) {
      throw new NotAuthenticatedError("Session is revoked. Please log in again.")
    }

    // check if the user id of this session tallies with the user id in the token
    if(typeof result !== "string") {
      // return an error if the user id of the token doesn't tally with that of the session.
      // this is to prevent an extra database query when the mismatch could be determined without one
      if(result?.userId !== foundSession.userId) throw new NotAuthenticatedError("Session is revoked. Please log in again")
    }

    // if the user id matches, retrieve the user details
    const user = await UserService.fetchById(foundSession.userId)
    .catch(()=> { throw new NotAuthenticatedError("Session is revoked. Please log in again")  })
    
    // return an error if the user is not longer in the database
    if (!user) {
      throw new NotAuthenticatedError("Session is revoked. Please log in again.")
    }

    // Attach session info to request for downstream handlers
    req.session = foundSession;
    // Attach user details to request for downstream handlers
    req.user = user;
    next();
  };

