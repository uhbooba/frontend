import React, { useState } from 'react';

type ChatInputProps = {
  onSend: (question: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSend(question);
      setQuestion(''); // Clear the input
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center space-x-2'>
      <input
        type='text'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder='질문을 입력해 주세요...'
        className='min-w-0 flex-grow rounded-lg border border-gray-300 p-2'
      />
      <button
        type='submit'
        className='min-w-[80px] flex-shrink-0 rounded-lg bg-primary p-2 text-black'
      >
        보내기
      </button>
    </form>
  );
};

export default ChatInput;
