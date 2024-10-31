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

// Function to handle POST request
export async function uploadImage(req, res) {
  try {
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return reject(err);
        }

        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: 'nextjs-uploads' },
          async (error, result) => {
            if (error) {
              res.status(500).json({ error: error.message });
              return reject(error);
            }

            
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
}

// Function to handle GET request
export function notAllowed(req, res) {
  res.status(405).json({ message: 'Method Not Allowed' });
}
