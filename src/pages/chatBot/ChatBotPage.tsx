import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import Chatbot from '@/components/chatbot/chatBot';

const ChatBotPage = () => {

  return (
    <div className=''>
      {/* 상단바 */}
      <TopBar title='챗봇' />
      <Chatbot />
      {/* 하단탭 */}
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default ChatBotPage;
