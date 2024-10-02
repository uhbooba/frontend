import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ question: string; answer: string }[]>([]);

  const handleSendMessage = async (question: string) => {
    const userMessage = { question, answer: '' };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('https://your-api-endpoint.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      userMessage.answer = data.answer; // Assuming the response contains an 'answer' field
      setMessages((prev) => [...prev.slice(0, -1), userMessage]); // Update the message with the answer
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">챗봇</h2>
      <div className="flex-1 overflow-auto p-4 border border-gray-300 rounded-lg">
        {messages.map((msg, index) => (
          <ChatMessage key={index} question={msg.question} answer={msg.answer} />
        ))}
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
