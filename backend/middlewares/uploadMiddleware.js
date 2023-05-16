const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where the files will be saved
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
  },
});

// Create the multer upload middleware
const upload = multer({ storage: storage });

module.exports = upload;
