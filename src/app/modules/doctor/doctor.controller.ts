import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import { ca } from "zod/v4/locales";
import pick from "../../utils/pick";
import { doctorFilterableFields } from "./doctor.constant";
import { DoctorService } from "./doctor.service";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const fillters = pick(req.query, doctorFilterableFields);

    const result = await DoctorService.getAllFromDB(fillters, options);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Doctor fetched successfully!",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {}
};

const updateIntoDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await DoctorService.updateIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Doctor updated successfully!",
      data: result,
    });
  } catch (error) {}
};

const getByIdFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await DoctorService.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Doctor retrieval successfully",
      data: result,
    });
  } catch (error) {}
};

const deleteFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await DoctorService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Doctor deleted successfully",
      data: result,
    });
  } catch (error) {}
};

const softDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await DoctorService.softDelete(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Doctor soft deleted successfully",
      data: result,
    });
  } catch (error) {}
};

const getAISuggestions = async (req: Request, res: Response) => {
  try {
    const result = await DoctorService.getAISuggestions(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "AI suggestions fetched successfully",
      data: result,
    });
  } catch (error) {}
};

export const DoctorController = {
  getAllFromDB,
  updateIntoDB,
  getByIdFromDB,
  deleteFromDB,
  softDelete,
  getAISuggestions,
};
