// Import necessary modules
import cloudinary from 'cloudinary';
import multer from 'multer';
import streamifier from 'streamifier';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadMiddleware = upload.single('file');

// API handler function
async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await new Promise((resolve, reject) => {
        uploadMiddleware(req, res, (err) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return reject(err);
          }

          const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: 'nextjs-uploads' },
            (error, result) => {
              if (error) {
                res.status(500).json({ error: error.message });
                return reject(error);
              }
              res.status(200).json({ result });
              resolve(result);
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Export the handler as default
export default handler;
