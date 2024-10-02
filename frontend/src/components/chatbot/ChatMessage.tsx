import React from 'react';

type ChatMessageProps = {
  question: string;
  answer: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ question, answer }) => {
  return (
    <div className="mb-4">
      <div className="text-left">
        <strong>사용자:</strong> {question}
      </div>
      {answer && (
        <div className="text-right text-gray-600">
          <strong>챗봇:</strong> {answer}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
