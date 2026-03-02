import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from 'dotenv'

dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith('video/');
    return {
      folder: "ArtistansProjectCollege",
      allowed_formats: ["png", "jpg", "jpeg", "mp4", "mov", "avi", "mkv", "webm"],
      resource_type: isVideo ? "video" : "image",
      format: isVideo ? "mp4" : undefined, // Convert videos to mp4 for better compatibility
    };
  },
});

export default storage;