const axios = require("axios").default;
// A funtion that makes a request to another server that sends an email with the provided data

const sendEmail = async ({ from = "prince", to, subject, text }) => {
  try {
    // create an axios instance
    const axiosInstance = axios.create({
      baseURL: process.env.MAILER_URL || "http://localhost:2023",
      timeout: 1000,
    });

    // make a request to the server
    const response = await axiosInstance.post("/send-email", {
      from,
      // to,
      to: "gbalamprince6@gmail.com",
      subject,
      text,
    });

    // return the response
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
