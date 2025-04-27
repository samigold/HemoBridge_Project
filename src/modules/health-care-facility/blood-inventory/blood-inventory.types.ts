import { DonorBloodTypes } from "src/modules/user/donor/model/donor.record";

export interface ICreateBloodInventory {
    facilityId: string;
    bloodType: DonorBloodTypes;
    unitsAvailable: number;
}