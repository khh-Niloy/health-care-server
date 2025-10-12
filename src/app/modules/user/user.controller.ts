import sendResponse from "../../shared/sendResponse"
import { userService } from "./user.service"
import { Response } from "express"
import { Request } from "express"

const createPatient = async (req: Request, res: Response) => {
    try {
        console.log("req.body", req.body)
        const data = await userService.createPatientService(req.body)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Patient created successfully",
            data: data
        })
    } catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Patient created failed",
            data: error
        })
    }
}

export const userController = {
    createPatient
}