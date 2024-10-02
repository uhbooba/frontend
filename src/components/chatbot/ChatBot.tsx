import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { axiosInstance } from '@/utils/axiosInstance';

const exampleQuestions = [
  '대표적인 모바일 뱅킹 앱 서비스가 뭐가 있을까?',
  '온라인 금융거래를 할 때 주의할 점에 대해 알려줘.',
];

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
        '/external-service/chat',
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

  const handleExampleClick = (question: string) => {
    handleSendMessage(question);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='flex h-full flex-col bg-gray-100 p-4'>
      <div className='mb-4 flex flex-1 flex-col overflow-hidden rounded-lg border-gray-300'>
        {messages.length == 0 && (
          <div className='mb-4 mt-4'>
            <h3 className='text-lg font-bold'>추천 질문</h3>
            <div className='grid grid-rows-2 gap-2'>
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  className='rounded bg-primary p-2 text-black hover:bg-blue-600'
                  onClick={() => handleExampleClick(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className='flex-1 overflow-auto'>
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              question={msg.question}
              answer={msg.answer}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className='fixed bottom-16 left-0 w-full border-t bg-white p-4'>
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chatbot;
