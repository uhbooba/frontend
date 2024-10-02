import { useEffect, useRef } from 'react';
import TopBar from '@/components/layouts/TopBar';

type SmishingEndingProps = {
  title: string | React.ReactNode;
  detail: string | React.ReactNode;
  onRetry: () => void;
  sender: string;
};

const SmishingEnding: React.FC<SmishingEndingProps> = ({
  title,
  detail,
  onRetry,
  sender,
}) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);
  return (
    <div className='flex flex-col' ref={scrollRef}>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar
          title={
            <div className='flex flex-row items-center justify-center'>
              <div className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300'>
                <span className='text-gray-600'>
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
                </span>
              </div>
              <p className='text-xl font-semibold'>{sender}</p>
            </div>
          }
          showXButton={false}
        />
      </div>

      <div className='mt-16 flex flex-grow flex-col items-center p-5'>
        <div className='w-full max-w-xl rounded-lg bg-white p-6 shadow-lg'>
          <div className='mb-8 text-center font-bold'>{title}</div>
          {detail}
          <div className='text-center'>
            <a href='#' className='mt-2 font-medium text-blue-600 underline'>
              뉴스 더보기 &gt;
            </a>
          </div>
        </div>

        {/* 다시 해보기 버튼 */}
        <div className='mt-8'>
          <button
            onClick={onRetry}
            className='hover:bg-primary-dark rounded-lg bg-primary px-6 py-3 text-xl text-black shadow-md'
          >
            다시 해보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmishingEnding;
