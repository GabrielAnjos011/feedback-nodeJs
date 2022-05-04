import { MailAdpter, SendMailData } from "../mail-adpters";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ab8367cf1a33d9",
      pass: "56b2299d5a4ca2"
    }
  });

export class NodemailerMailAdpter implements MailAdpter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe de feedback <equipefeed@gmail.com>",
      to: "Gabriel Garcia <gabrielgarcia.anjos250@gmail.com>",
      subject,
      html: body,
    });
  }
}
