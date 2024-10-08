export type QuizItem = {
  number: number;
  question: string;
  answer: string;
  comment: string;
};

interface SmishingMessage {
  message: string;
  remain: number;
  scenario: string;
  sender: string;
  sender_img: string;
  time: string;
}
