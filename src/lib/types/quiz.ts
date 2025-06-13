// src/lib/types/quiz.ts

export type OptionData = {
  text: string;
};

export type QuestionData = {
  text: string;
  options: OptionData[];
  correctOptionIndex: number;
};

export type QuizFormData = {
  title: string;
  description?: string;
  questions: QuestionData[];
};