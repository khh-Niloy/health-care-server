import { ERole } from "../modules/user/user.interface";

export type IJWTPayload = {
    email: string;
    role: ERole;
}