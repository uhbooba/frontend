import React from 'react';

type ChatMessageProps = {
  question: string;
  answer: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ question, answer }) => {
  return (
    <div className='mb-4 mt-16'>
      {/* 질문을 오른쪽 정렬 */}
      {question && (
        <div className='mb-2 flex justify-end'>
          <div className='w-auto max-w-[70%] whitespace-pre-wrap rounded-lg bg-primary p-2 text-left text-black'>
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
