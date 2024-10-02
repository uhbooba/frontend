import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import Chatbot from '@/components/chatbot/ChatBot';

const ChatBotPage = () => {
  return (
    <div className='flex h-screen flex-col'>
      {/* 상단바 */}
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='챗봇' />
      </div>
      <div className='mb-16 mt-16 flex-1 overflow-auto'>
        <Chatbot />
      </div>
      {/* 하단탭 */}
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default ChatBotPage;
