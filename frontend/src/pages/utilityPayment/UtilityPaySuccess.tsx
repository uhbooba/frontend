import Button from '@/components/common/buttons/Button';
import TextBubble from '@/components/common/TextBubble';
import TopBar from '@/components/layouts/TopBar';
import MissionSuccessModal from '@/components/modals/MissionSuccessModal';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { utilityMissionAtom } from '@/atoms/utilityAtoms';
import { setMissionClearStatus } from '@/services/mission';

const UtilityPaySuccess = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const isMission = useAtomValue(utilityMissionAtom);

  // 공과금 미션 확인
  useEffect(() => {
    const fetchExchangeMission = async () => {
      try {
        const response = await setMissionClearStatus(5);

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

    if (isMission) {
      fetchExchangeMission();
    }
  }, []);

  return (
    <div>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='공과금 납부' showBackButton={false} />
      </div>
      {isSuccessModalOpen && (
        <MissionSuccessModal
          name='공과금 납부'
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
          <p className='text-5xl font-bold'>공과금 납부 성공</p>
        </div>

        {/* 말풍선 부분 */}
        <TextBubble content={['공과금 납부 성공', '축하합니다!']} />

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
          />
        </div>
      </div>
    </div>
  );
};

export default UtilityPaySuccess;
