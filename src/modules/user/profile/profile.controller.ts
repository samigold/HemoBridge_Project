import { Request, Response } from "express";
import { ProfileService } from "./profile.service";
import { InternalServerError } from "src/shared/errors";

export const ProfileController = {
    getMyProfile: async (req: Request, res: Response) => {
        const user = req.user!;

        const profile = await ProfileService.getProfileByRole({ id: user.id, role: user.role })
        .catch(()=> {
            throw new InternalServerError("There was an error fetching profile");
        })

        res.status(200).json({
            status: "SUCCESS",
            data: profile
        });
    }
}