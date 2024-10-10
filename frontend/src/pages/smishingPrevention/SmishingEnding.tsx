import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { smishingData } from '@/constants/SmishingData';
import { useFormattedContent } from '@/hooks/useFormattedContent';
import { postSmishingStatus } from '@/services/education';
import MainWrapper from '@/components/layouts/MainWrapper';

const SmishingEnding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { messageType } = useParams(); // 시작 타입
  const [data] = useState(smishingData); // 피싱 데이터
  const { endingId } = location.state;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [endingData] = useState(data[endingId as keyof typeof data] ?? {});

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }

    fetchEnding();
  }, []);

  const fetchEnding = async () => {
    if (!messageType) return;

    try {
      await postSmishingStatus(endingId);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAgain = async () => {
    if (!messageType) return;

    try {
      await postSmishingStatus(endingId[0] + '0000');

      navigate('/prevention/messages');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAgain = () => {
    fetchAgain();
  };

  const formattedModalTitle = useFormattedContent(
    endingData?.ending?.title ?? '',
    'text-2xl',
  );
  const formattedModalDetail = useFormattedContent(
    endingData?.ending?.detail ?? '',
    'text-xl',
  );

  // endingData가 없는 경우 예외 처리
  if (!endingData) {
    return (
      <div className='flex h-screen items-center justify-center'>
        데이터를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className='flex h-screen flex-col bg-yellow-100' ref={scrollRef}>
      <TopBar
        title={
          <div className='flex flex-row items-center justify-center'>
            <p className='text-xl font-semibold'>{endingData?.sender}</p>
          </div>
        }
        showXButton={false}
      />

      <MainWrapper>
        <div className='flex flex-col items-center justify-center'>
          {/* 다시 해보기 버튼 */}
          <div className='my-3'>
            <button
              onClick={handleAgain} // 뒤로 가기 기능
              className='rounded-lg bg-primary px-6 py-3 text-xl text-black shadow-md'
            >
              다시 해보기
            </button>
          </div>
          <div className='w-full max-w-xl rounded-lg bg-white p-6 shadow-lg'>
            <div>
              <img
                src={endingData?.ending?.img ?? ''}
                className='mb-4 w-[600px] min-w-24'
              />
            </div>
            <div className='mb-8 text-center font-bold'>
              {formattedModalTitle}
            </div>
            {formattedModalDetail}
            <div className='text-center'>
              <a
                href={endingData?.ending?.news}
                className='mt-2 font-medium text-blue-600 underline'
                target='_blank'
              >
                뉴스 더보기 &gt;
              </a>
            </div>
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default SmishingEnding;
