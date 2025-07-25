import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface Options {
  reciver_mail: string;
  subject: string;
  body: string;
}

export const sendEmail = async ({ reciver_mail, subject, body }: Options) => {
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true,
    logger: true,
  } as SMTPTransport.Options);

  const mail = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: reciver_mail,
    subject,
    html: body,
  };

  await transport.sendMail(mail);
};
