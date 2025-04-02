import asyncHandler from "express-async-handler";
import { Facility } from "../models/facilityModel.js";


// @desc    get all facilities
// @route   GET /api/facilities
export const getAllFacilities = asyncHandler(async (req, res) => {
    const facilities = await Facility.find({}).populate("facilityName", "facilityType address email");
    res.json(facilities);
});