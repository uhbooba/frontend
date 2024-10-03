import { axiosInstance } from '@/utils/axiosInstance';

// 챗봇 질문 전송
export const postChatBotQuestion = (question: string) => {
  return axiosInstance.post('/external-service/chat', {
    question,
  });
};
