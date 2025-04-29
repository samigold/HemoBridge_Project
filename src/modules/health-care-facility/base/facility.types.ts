import { DonorBloodTypes } from "src/modules/user/donor/model/donor.record";

export interface ICreateFacility {
    name: string;
    address: string;
    operationalHours: string;
    bloodTypes: DonorBloodTypes[];
}