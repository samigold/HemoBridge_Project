import { USER_ROLE } from "src/shared/constants/user-role.enum";
import DonorService from "../donor/donor.service";
import CareGiverService from "../care-giver/caregiver.service";
import { FacilityStaffService } from "src/modules/health-care-facility/facility-staff/facility-staff.service";
import { BadRequestError, NotFoundError } from "src/shared/errors";
import eventBus from "src/shared/events/event-bus";
import { AdminUserCreatedEvent, USER_EVENTS } from "src/shared/events/user.events";
import AdminProfileModel from "./admin-profile/model/admin-profile.model";
import { ICreateAdminProfile } from "./user.types";
import { DonorEntity } from "../donor/donor.entity";
import { CareGiverEntity } from "../care-giver/care-giver.entity";
import { FacilityStaffEntity } from "src/modules/health-care-facility/facility-staff/facility-staff.entity";
import { FacilityService } from "src/modules/health-care-facility/base/facility.service";
import { AdminProfileEntity } from "./admin-profile/admin-profile.entity";

interface IAllProfiles  {
  role: string;
}

export const ProfileService = {
    getProfileByRole: async function(user: {id:string, role: USER_ROLE}): Promise<DonorEntity|CareGiverEntity|FacilityStaffEntity|AdminProfileEntity> {
      switch (user.role) {
          case USER_ROLE.DONOR:
            return await DonorService.getByUserId(user.id);
    
          case USER_ROLE.CARE_GIVER:
            return await CareGiverService.getByUserId(user.id);
    
          case USER_ROLE.FACILITY_STAFF:

          // fetch facility staff profile
          const staffProfile = await FacilityStaffService.getByUserId(user.id);

          if(!staffProfile) throw new NotFoundError("Facility staff profile not found");

          // Get facility details to get name
          const facilityDetails = await FacilityService.findById(staffProfile.facilityId)
          .catch(()=> null );

          //Get user details to get staff name

          // const userDetails = await UserModel.findById(user.id)
          // .select({ first_name: 1, last_name: 1 })
          // .lean<{ first_name?: string; last_name?: string }>()
          // .catch(() => null);


            //Return the profile with facility name and user name
            return {
              ...staffProfile,
              facilityName: facilityDetails?.name || "Facility not found"

            }

          case USER_ROLE.ADMIN:
              return await this.fetchAdminProfile(user.id);
    
          default:
            throw new BadRequestError("Unsupported user role");
      }
    },

    createAdminProfile: async (newAdminUser: ICreateAdminProfile)=> {
      await AdminProfileModel.create({
        user_id: newAdminUser.user_id,
        first_name: newAdminUser.first_name,
        last_name: newAdminUser.last_name

      }).catch((error)=> {
        console.error("There was an error creating new admin user profile: ", error);
        throw error
      })
    },

    fetchAdminProfile: async (userId: string)=> {
      const result = await AdminProfileModel.findOne({ user_id: userId })
      .catch((error)=> {
        console.error("There was an error creating finding admin profile: ", error);
        throw error
      })

      if(!result) throw new NotFoundError("Admin profile not found");

      return AdminProfileEntity.fromRecordToEntity(result);
    }
}

eventBus.on(USER_EVENTS.CREATED, async (createdUser: AdminUserCreatedEvent)=> {
  if(createdUser.role === USER_ROLE.ADMIN) {
    await ProfileService.createAdminProfile(createdUser)
    .catch((error)=> { throw error })
  }
})