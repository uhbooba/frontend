import { exchangeMissionAtom } from '@/atoms/exchangeAtoms';
import Button from '@/components/common/buttons/Button';
import TextBubble from '@/components/common/TextBubble';
import MainWrapper from '@/components/layouts/MainWrapper';
import TopBar from '@/components/layouts/TopBar';
import MissionSuccessModal from '@/components/modals/MissionSuccessModal';
import { setMissionClearStatus } from '@/services/mission';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useResetExchangeValues from '@/hooks/useResetExchangeValues';

const ExchangeSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMission = useAtomValue(exchangeMissionAtom);
  const { amount } = location.state;
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const resetValues = useResetExchangeValues();

  // 환전 미션 확인
  useEffect(() => {
    const fetchExchangeMission = async () => {
      try {
        const response = await setMissionClearStatus(7);

        if (response?.statusCode === 200) {
          const timer = setTimeout(() => {
            setIsSuccessModalOpen(true);
          }, 1000);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (amount === '150' && isMission) {
      fetchExchangeMission();
    }

    resetValues(); // 값 초기화
  }, []);

  return (
    <div>
      <TopBar title='환전' showBackButton={false} />
      <MainWrapper>
        {isSuccessModalOpen && (
          <MissionSuccessModal
            name='환전'
            onConfirm={() => setIsSuccessModalOpen(false)}
          />
        )}

        {/* 배경 이미지 설정 */}
        <div
          className='relative mt-16 flex flex-grow flex-col justify-between px-4 pt-8'
          style={{
            backgroundImage: `url("/assets/images/coin_rain.png")`,
            backgroundSize: '440px auto',
            backgroundPosition: 'center -50px',
          }}
        >
          <div className='mt-4 text-center'>
            <p className='text-5xl font-bold'>환전 성공</p>
          </div>

          {/* 말풍선 부분 */}
          <TextBubble content={['환전 성공', '축하합니다!']} />
          {/* 돼지 이미지 */}
          <div className='mb-4 flex justify-end'>
            <img
              src='/assets/images/finish_j_pig.png'
              alt='Pig'
              className='h-60 w-60'
            />
          </div>

          {/* 버튼 */}
          <div>
            <Button
              label='나의 계좌로 이동하기'
              size='large'
              color='orange'
              className='w-full py-4'
              onClick={() => navigate('/account/check')}
            />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default ExchangeSuccess;
