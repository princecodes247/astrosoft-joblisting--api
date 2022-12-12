const AWS = require("aws-sdk");
const s3 = new AWS.S3();

async function uploadFile(file) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
  };

  const uploadedFile = await s3.upload(params).promise();

  return uploadedFile;
}

function downloadFile(file) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.name,
  };

  s3.getObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
}

// Sample input for uploadFile
// uploadFile({
//     name: "test.txt",
//     type: "text/plain",

const AWSUtil = {
  uploadFile,
  downloadFile,
};

module.exports = AWSUtil;
