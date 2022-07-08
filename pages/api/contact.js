let nodemailer = require("nodemailer");

const password = process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD;

export default function (req, res) {
  console.log("body", req.body);
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "trylandan@gmail.com",
      pass: password,
    },
    secure: true,
  });

  const mailData = {
    from: "trylandan@gmail.com",
    to: "dtranrules@gmail.com",
    subject: `Message From ${req.body.name}`,
    text: req.body.message,
    html: `<div>${req.body.message}</div>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  res.status(200).send({
    message: "Email successfully sent.",
  });
}
