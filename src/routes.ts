import express from "express";
import { NodemailerMailAdpter } from "./adpters/nodemailer/nodemailer-mail-adpter";
import { PrismaFeedbackRepository } from "./repositories/prisma/prisma-feedback-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

//Antes da aplicação do SOLID
// const transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "ab8367cf1a33d9",
//       pass: "56b2299d5a4ca2"
//     }
//   });

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMailAdpter = new NodemailerMailAdpter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdpter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  //Antes da aplicação do SOLID
  // const feedback = await prisma.feedback.create({
  //   data: {
  //     type,
  //     comment,
  //     screenshot,
  //   },
  // });

  // await transport.sendMail({
  //     from: 'Equipe de feedback <equipefeed@gmail.com>',
  //     to: 'Gabriel Garcia <gabrielgarcia.anjos250@gmail.com>',
  //     subject: 'Novo Feedback',
  //     html: [
  //         `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
  //         `<p>Tipo de feedback: ${type}</p>`,
  //         `<p>Comentario: ${comment}</p>`,
  //         `</div>`,
  //     ].join('\n')
  // })

  return res.status(201).send();
});
