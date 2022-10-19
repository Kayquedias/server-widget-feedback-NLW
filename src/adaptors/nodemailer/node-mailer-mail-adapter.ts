import { MailAdpater, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "00aa5a46d71eea",
    pass: "30e3ea51a3e328"
  }
});

export class NodemailerAdapter implements MailAdpater { 
  async sendMail({ subject, body }: SendMailData) { // Faz o envio do email 
    transport.sendMail({
      from: 'Equipe Widget <email@gmail.com>',
      to: 'Kayque Dias <kayquemtd@gmail.com>',
      subject,
      html: body,
    })  
  };
}