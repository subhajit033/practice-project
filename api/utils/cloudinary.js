import { v2 as cloudinary } from 'cloudinary';
import { unlinkSync } from 'fs';

console.log(process.env.CLOUDINARY_API_KEY);
cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: 'dp63d4htw',
  api_key: '386185763929372',
  api_secret: 'SjrNQHDdGVmvHR8-AyZbruDimAg',
});

const uploadOnclould = async (fileName) => {
  if (!fileName) return null;
  console.log('filename ' + fileName);
  try {
    const res = await cloudinary.uploader.upload(fileName, {
      resource_type: 'auto',
    });
    unlinkSync(fileName);
    return res.url;
  } catch (err) {
    
    return null;
  }
};

export { uploadOnclould };
