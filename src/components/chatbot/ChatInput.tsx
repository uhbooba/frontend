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
    <form onSubmit={handleSubmit} className='flex items-center'>
      <input
        type='text'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder='질문을 입력해 주세요...'
        className='flex-grow rounded-lg border border-gray-300 p-2'
      />
      <button
        type='submit'
        className='ml-2 w-18 flex-shrink-0 rounded-lg bg-primary p-2 text-black'
      >
        보내기
      </button>
    </form>
  );
};

export default ChatInput;
