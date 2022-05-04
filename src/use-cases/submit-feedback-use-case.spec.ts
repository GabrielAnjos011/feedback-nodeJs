import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn()
const sendMailkSpy = jest.fn()

const SubmitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailkSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      SubmitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64test.jpg",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailkSpy).toHaveBeenCalled()
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      SubmitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64test.jpg",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      SubmitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64test.jpg",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with an invalid screenshot", async () => {
    await expect(
      SubmitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
