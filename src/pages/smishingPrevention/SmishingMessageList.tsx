import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';

const SmishingMessageList = () => {
  const navigate = useNavigate();

  const messageList = [
    {
      id: 1,
      phoneNumber: '010-9801-2324',
      content: '엄마, 핸드폰이 고장나서 수리...',
      time: '오후 12:30',
      messageType: 'A0000',
    },
    {
      id: 2,
      phoneNumber: '010-5261-1881',
      content: '[안심택배] 배송 출발 고객님의...',
      time: '오전 11:20',
      messageType: 'C0000',
    },
    {
      id: 3,
      phoneNumber: '1588-2187',
      content: '축하합니다! 응모하신 임영웅 콘...',
      time: '오후 12:30',
      messageType: 'D0000_F',
    },
    {
      id: 4,
      phoneNumber: '010-0208-9712',
      content: '[모바일 초대] 김지윤❤️차은우...',
      time: '오전 12:30',
      messageType: 'B0000',
    },
    {
      id: 5,
      phoneNumber: '031-2246-2924',
      content: '귀하에게 민원이 접수되어 통...',
      time: '오전 12:30',
      messageType: 'F0000_F',
    },
    {
      id: 6,
      phoneNumber: '010-2363-4768',
      content: 'S사 상한가 포착! 수익률 보장...',
      time: '오전 12:30',
      messageType: 'E0000',
    },
  ];

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
