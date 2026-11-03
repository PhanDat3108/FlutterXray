

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const randomString = crypto.randomBytes(4).toString('hex');

        return {
            folder: 'flutterxray_wireframes',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],

            public_id: `wireframe_${Date.now()}_${randomString}`,
        };
    },
});


export const uploadWireframe = multer({ storage: storage });