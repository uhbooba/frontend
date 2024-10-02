import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { axiosInstance } from '@/utils/axiosInstance';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<
    { question: string; answer: string }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async (question: string) => {
    const userMessage = { question, answer: '' };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Axios로 POST 요청 보낼 때는 data를 사용해야 합니다.
      const response = await axiosInstance.post(
        '/external-service/ai/get_answer',
        {
          question, // 여기에 전송할 데이터를 넣습니다.
        },
      );

      // Axios는 응답 객체에 status가 바로 있으므로, response.status로 상태 확인
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      // Axios 응답은 이미 JSON으로 파싱된 상태입니다.
      const data = response.data;
      userMessage.answer = data.answer;
      setMessages((prev) => [...prev.slice(0, -1), userMessage]);
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='flex h-full flex-col bg-gray-100 p-4'>
      <div className='flex-1 overflow-auto rounded-lg border border-gray-300'>
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            question={msg.question}
            answer={msg.answer}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='fixed bottom-16 left-0 w-full border-t bg-white p-4'>
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chatbot;
