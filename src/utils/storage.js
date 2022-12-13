const axios = require("axios").default;
// A funtion that makes a request to another server with a file to store it there

const uploadFile = async (file, type = "resume") => {
  try {
    // create an axios instance
    const axiosInstance = axios.create({
      baseURL: process.env.STORAGE_URL || "http://localhost:2023",
      timeout: 1000,
    });

    // make a request to the server
    const response = await axiosInstance.post(`/upload-file/${type}`, file);

    // return the response
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = uploadFile;
