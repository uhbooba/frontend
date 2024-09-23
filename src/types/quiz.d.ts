export interface QuizData {
  part: number;
  number: number;
  question: string;
  comment: string;
  answer: 'O' | 'X';
}
