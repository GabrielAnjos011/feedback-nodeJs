import { MailAdpter } from "../adpters/mail-adpters";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
  }

export class SubmitFeedbackUseCase {
    constructor (
        private feedbacksRepository: FeedbackRepository,
        private MailAdpter: MailAdpter,
    ){}
    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if(!type) {
            throw new Error('type is required.')
        }

        if(!comment) {
            throw new Error('comment is required.')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.MailAdpter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                screenshot ? `<img src=${screenshot} alt="Imagem referente ao screenshot da tela referente ao um problema ou ideia"/>` : '',
                `</div>`,
              ].join("\n"),
        })
    }
}