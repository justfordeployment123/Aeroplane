// utils/cloudinary.js
// Centralised Cloudinary v2 config.
// Set these in your .env:
//   CLOUDINARY_CLOUD_NAME=
//   CLOUDINARY_API_KEY=
//   CLOUDINARY_API_SECRET=

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a base64 or file-path string to Cloudinary.
 * @param {string} fileStr  – data URI (base64) or local path
 * @param {string} folder   – Cloudinary folder, e.g. "markhor/products"
 * @returns {{ url, publicId }}
 */
const uploadImage = async (fileStr, folder = "markhor/products") => {
    const result = await cloudinary.uploader.upload(fileStr, {
        folder,
        resource_type: "image",
        // Generate a web-optimised version automatically
        transformation: [{ quality: "auto", fetch_format: "auto" }],
    });
    return { url: result.secure_url, publicId: result.public_id };
};

/**
 * Delete an image from Cloudinary by its publicId.
 * Safe to call with empty string – will just resolve.
 */
const deleteImage = async (publicId) => {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
};

module.exports = { cloudinary, uploadImage, deleteImage };