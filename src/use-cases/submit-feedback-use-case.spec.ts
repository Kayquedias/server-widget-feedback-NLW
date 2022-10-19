import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }, 
);

describe('Submit Feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: "IDEA",
      comment: "Olha que interessante adicionar isso...",
      screenshot: "data:image/png;base64.jpg"
    })).resolves.not.toThrow(); // Espera que a função se resolva (chegue até o final) e não devolva nenhum erro (not.toThrow())

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  })
  
  it('should not be able to submit a feedback without a type', async () => {
    await expect(submitFeedback.execute({
      type: "",
      comment: "Olha que interessante adicionar isso...",
      screenshot: "data:image/png;base64.jpg"
    })).rejects.toThrow();// Espera que a função rejeite e devolva algum erro
  })

  it('should not be able to submit a feedback without a comment', async () => {
    await expect(submitFeedback.execute({
      type: "IDEA",
      comment: "",
      screenshot: "data:image/png;base64.jpg"
    })).rejects.toThrow(); // Espera que a função rejeite e devolva algum erro 
  })

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: "IDEA",
      comment: "Olha que interessante para adicionar...",
      screenshot: "print.jpg"
    })).rejects.toThrow(); 
  })
})