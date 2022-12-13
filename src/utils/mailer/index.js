const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "princecodes247@gmail.com",
    pass: "qsnqmfjkulmfnxjj",
  },
});

const sendEmail = ({
  from = "prince",
  to = "gbalamprince6@gmail.com",
  subject = "test",
  text = "test",
}) => {
  transport.sendMail(
    {
      from,
      // to: "jenakumoemmanuel@gmail.com",
      to,
      // subject: req.body.subject,
      subject,
      // text: req.body.body,
      text,
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

module.exports = sendEmail;
