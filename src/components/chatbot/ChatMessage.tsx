import React from 'react';

type ChatMessageProps = {
  question: string;
  answer: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ question, answer }) => {
  return (
    <div className='mt-16 mb-4'>
      {/* 질문을 오른쪽 정렬 */}
      {question && (
        <div className='flex justify-end mb-2'>
          <div className='w-auto max-w-[70%] whitespace-pre-wrap rounded-lg bg-blue-500 p-2 text-left text-white'>
            <p>{question}</p>
          </div>
        </div>
      )}

      {/* 답변을 왼쪽 정렬 */}
      {answer && (
        <div className='flex justify-start'>
          <div className='w-auto max-w-[70%] whitespace-pre-wrap rounded-lg bg-gray-300 p-2 text-left text-black'>
            <p>{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
