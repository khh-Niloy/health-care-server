import multer from "multer";
import { Request } from "express";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { envVars } from "../middlewares/env";

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  cloudinary.config({
    cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET,
  });

  const uploadResult = await cloudinary.uploader
    .upload(
      file.path,
      {
        public_id: file.filename,
      }
    )
    .catch((error) => {
      console.log(error);
    });

  return uploadResult?.secure_url;
};
