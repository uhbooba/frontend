import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { useEffect, useState } from 'react';
import { getSmishing } from '@/services/education';
import { SmishingMessage } from '@/types/education';
import { useFormattedContent } from '@/hooks/useFormattedContent';
import MainWrapper from '@/components/layouts/MainWrapper';

const SmishingMessageList = () => {
  const navigate = useNavigate();
  const [messageList, setMessageList] = useState<SmishingMessage[]>([]);
  const [remain, setRemain] = useState('');
  const formattedRemain = useFormattedContent(remain, 'text-3xl');

  const fetchSmishing = async () => {
    const response = await getSmishing();
    setMessageList(response?.data?.data);
    setRemain(response?.data?.message);
  };

  useEffect(() => {
    fetchSmishing();
  }, []);

  const GoEdu = () => {
    navigate('/education');
  };

  return (
    <div>
      <TopBar title='금융 사기 예방' onXButtonClick={GoEdu} />

      <MainWrapper>
        <h3 className='my-6 text-center text-3xl font-bold leading-10'>
          {formattedRemain}
        </h3>
        <ul className='space-y-4'>
          {messageList.map((message) => (
            <li
              key={message.scenario}
              className='flex cursor-pointer items-center justify-between border-b border-gray-300 p-4'
              onClick={() =>
                navigate(`/prevention/messages/${message.scenario}`)
              }
            >
              <div className='flex w-11/12 items-center space-x-4'>
                {/* 프로필 */}
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-300'>
                  <img src={message?.sender_img} alt='Sender Profile' />
                </div>
                {/* 전화번호, 시간 및 메세지 */}
                <div className='w-full max-w-[75%]'>
                  <div className='flex justify-between'>
                    <p className='truncate font-bold'>{message?.sender}</p>
                    <p className='truncate text-gray-400'>{message.time}</p>
                  </div>
                  <p className='w-full truncate whitespace-nowrap text-gray-500'>
                    {message?.message}
                  </p>
                </div>
              </div>

              {/* 남은 메시지 갯수 */}
              <div className='text-right'>
                {message?.remain > 0 && (
                  <div className='mt-1 flex justify-end'>
                    <span className='flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white'>
                      {message?.remain}
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </MainWrapper>
    </div>
  );
};

export default SmishingMessageList;
