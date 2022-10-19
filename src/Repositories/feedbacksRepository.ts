export interface FeedbackCreateData { // O que o método create precisa para criar um feedback
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository { // Quais ações a minha aplicação pode fazer no banco de dados
  create: (data: FeedbackCreateData) => Promise<void>;
}