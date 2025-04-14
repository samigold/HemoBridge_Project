import { BloodInventoryModel } from "./model/blood-inventory.model";

export const BloodInventoryService = {
    create: async (data: {
        facility_id: string;
        blood_type: string;
        stock_level: number;
        urgency_level: "low" | "medium" | "high";
        location: string;
    }) => {
        return await BloodInventoryModel.create(data);
    },
}