const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars',
    allowed_formats: ['jpg', 'jpeg', 'png','webp'],
    public_id: (req, file) => `user_${Date.now()}`
  }
});

const upload = multer({ storage });

module.exports = upload;
