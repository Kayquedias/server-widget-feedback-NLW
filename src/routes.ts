import express from 'express';
import { NodemailerAdapter } from './adaptors/nodemailer/node-mailer-mail-adapter';
import { PrismaFeedbacksRepository } from './Repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => { // req = tudo enviado do front, res = tudo enviado de volta ao front
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository;
  const nodemailerMailAdapter = new NodemailerAdapter;
  
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  );


  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send();
})