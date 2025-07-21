import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config({ path: ".env" });

cloudinary.config({
  cloud_name: process.env.CLOUINARY_CLOUD_NAME,
  api_key: process.env.CLOUINARY_API_KEY,
  api_secret: process.env.CLOUINARY_API_SECRET,
});

export const uploadSingleImage = async (image: string, folder_name: string) => {
  const response = await cloudinary.uploader.upload(image, {
    folder: folder_name,
  });

  return {
    image_url: response.secure_url,
    public_alt: response.public_id,
  };
};

export const deleteImage = async (public_alt: string) => {
  const res = await cloudinary.uploader.destroy(public_alt);

  return res?.result === "ok";
};
