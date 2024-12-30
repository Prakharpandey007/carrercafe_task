import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "prakharharshit327@gmail.com",
    pass: "nmeyaopnypxandan",
  },
});

export const sendEmail = (to, subject, text) => {
  return transporter.sendMail({
    from: "prakharharshit327@gmail.com",
    to,
    subject,
    text,
  });
};
