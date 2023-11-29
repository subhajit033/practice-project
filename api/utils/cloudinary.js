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

const uploadOnclould = async (fileName, avatarImage) => {
  if (!fileName) return null;
  let url = null;
  try {
    const res = await cloudinary.uploader.upload(fileName, {
      resource_type: 'auto',
    });

    //resize the image if it is avatar image
    if (avatarImage) {
      url = await cloudinary.url(res.public_id, {
        width: 500,
        height: 500,
        crop: 'fill',
      });
      unlinkSync(fileName);
      return url;
    }
    unlinkSync(fileName);
    return res.url;
  } catch (err) {
    unlinkSync(fileName);
    return null;
  }
};

export { uploadOnclould };
