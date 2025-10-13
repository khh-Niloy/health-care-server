import { envVars } from "../middlewares/env";
import bcryptjs from "bcryptjs";

const hashPassword = async (password: string) => {
    return await bcryptjs.hash(password, Number(envVars.BCRYPT_SALT_ROUND));
}

const verifyPassword = async (password: string, hash: string) => {
    return await bcryptjs.compare(password, hash);
}

export const passwordService = {
    hashPassword,
    verifyPassword,
}