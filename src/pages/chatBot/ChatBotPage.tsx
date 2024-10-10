import TopBar from '@/components/layouts/TopBar';
import Chatbot from '@/components/chatbot/ChatBot';

const ChatBotPage = () => {
  return (
    <div className='flex h-[calc(100vh-120px)] flex-col'>
      {/* 상단바 */}
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='금융 도우미' />
      </div>
      <div className='flex-1 overflow-hidden pb-2 pt-16'>
        <Chatbot />
      </div>
    </div>
  );
};

export default ChatBotPage;
