import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnclould = async (fileName) => {
  if (!fileName) return null;
  try {
    const res = await cloudinary.uploader.upload(
      fileName,
      {
        resource_type: 'auto',
      }
    );
    console.log(res);
    return res.url;
  } catch (err) {
    return null;
  }
};

export {uploadOnclould}
