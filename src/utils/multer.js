const multer = require("multer");

const storage = multer.memoryStorage();

const limits = {
  // Maximum file size of 2mb
  fileSize: 2 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  //Accepted file types pdf, doc, docx
  const mimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];

  // Check if file type is accepted
  if (mimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("Invalid file type");
    console.log(file.mimetype);
    cb(new Error("Invalid file type"), false);
  }
};

module.exports = multer({ storage, limits, fileFilter });
