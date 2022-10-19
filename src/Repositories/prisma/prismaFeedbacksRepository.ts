import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbacksRepository { // Dentro dessa classe faz a operação de criação do feedback
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    })
  }
}