import { resolveHref } from "next/dist/next-server/lib/router/router";

let nodemailer = require("nodemailer");

const password = process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD;

export default async function (req, res) {
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

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailData = {
    from: {
      name: req.body.name,
      address: "trylandan@gmail.com",
    },
    to: "dtranrules@gmail.com",
    subject: `Message From ${req.body.name} via portfolio website`,
    text: req.body.message,
    html: `<div>${req.body.message}</div>`,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  res.status(200).json({
    status: "OK",
  });
}
