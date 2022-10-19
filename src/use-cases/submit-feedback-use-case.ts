import { MailAdpater } from "../adaptors/mail-adapter";
import { FeedbacksRepository } from "../Repositories/feedbacksRepository";

interface SubmitFeedbackUseCaseRequest { // O que eu preciso para dar um submit no feedback
  type: string;
  comment: string;
  screenshot: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdpater
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error('Type is required!')
    }

    if(!comment) {
      throw new Error('Comment is required!')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format!')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo email',
      body: [ // Para cada index do array equivale a uma linha no html 
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;" >`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      screenshot ? `<img src='${screenshot}' />` : ``,
      `</div>`,
    ].join('\n')
    })
  }
}

// Repositório use cases é todo caso uso de uso dentro de uma pasta, esse arquivo por exemplo 
// é usado para um submit