import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { messageList } from '@/constants/SmishingData';

const SmishingMessageList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='금융 사기 예방' />
      </div>

      <div className='mb-6 mt-20 p-5'>
        <h3 className='mb-4 text-center text-3xl font-bold leading-10'>
          읽지 않은 메시지 <br /> {messageList.length}개
        </h3>
        <ul className='space-y-4'>
          {messageList.map((message) => (
            <li
              key={message.id}
              className='flex cursor-pointer items-center justify-between border-b border-gray-300 p-4'
              onClick={() =>
                navigate(`/prevention/messages/${message.messageType}`)
              }
            >
              <div className='flex items-center space-x-4'>
                {/* 프로필 */}
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-300'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-6'
                  >
                    <path
                      fillRule='evenodd'
                      d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                {/* 전화번호, 시간 */}
                <div>
                  <div className='flex flex-row justify-between'>
                    <p className='font-bold'>{message.phoneNumber}</p>
                    <p className='truncate text-gray-400'>{message.time}</p>
                  </div>
                  <p className='truncate text-gray-500'>{message.content}</p>
                </div>
              </div>
              <div className='text-right'>
                {message && (
                  <div className='mt-1 flex justify-end'>
                    <span className='flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white'>
                      1
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SmishingMessageList;
