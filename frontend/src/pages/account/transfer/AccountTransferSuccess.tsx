import Button from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { isTransferMissionProgressingAtom } from '@/atoms/account/accountTransferAtoms';
import { useState } from 'react';
import MissionSuccessModal from '@/components/modals/MissionSuccessModal';
import { setMissionClearStatus } from '@/services/mission'; // axios 호출 함수

const AccountTransferSuccess = () => {
  const navigate = useNavigate();
  const [isMissionProgressing, setIsMissionProgressing] = useAtom(
    isTransferMissionProgressingAtom,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMissionSuccess = async () => {
    if (isMissionProgressing) {
      try {
        // 미션 상태 업데이트
        await setMissionClearStatus(3);

        // 모달 열기
        setIsModalOpen(true);

        // 미션 진행 상태 변경
        setIsMissionProgressing(false);
      } catch (error) {
        console.error('미션 상태 업데이트 중 오류 발생:', error);
      }
    }
  };

  // 컴포넌트가 마운트될 때 미션 성공 처리
  useEffect(() => {
    handleMissionSuccess();
  }, []);

  return (
    <div>
      <TopBar title='계좌 이체' showBackButton={false} />
      <MainWrapper>
        {/* 배경 이미지 설정 */}
        <div
          className='relative flex flex-grow flex-col justify-between px-4 pt-8'
          style={{
            backgroundImage: `url("/assets/images/money_rain.png")`,
            backgroundSize: '420px auto',
            backgroundPosition: 'center -50px',
          }}
        >
          <div className='mt-4 text-center'>
            <p className='text-5xl font-bold'>계좌 이체</p>
            <p className='mt-2 text-5xl font-bold'>성공</p>
          </div>

          {/* 말풍선 부분 */}
          <div className='relative mt-24 w-[290px] font-bold'>
            <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-6'>
              <p className='text-start text-xl text-black'>축하합니다~~</p>
              <p className='mt-2 text-start text-xl text-black'>
                계좌 이체를 성공했어요!
              </p>

              {/* 말풍선 꼬리 부분 */}
              <div className='absolute bottom-[-22px] left-[70%] -translate-x-1/2 transform'>
                <div className='h-0 w-0 border-l-[22px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300'></div>
                <div className='absolute left-[50%] top-[-1px] h-0 w-0 -translate-x-1/2 transform border-l-[20px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100'></div>
              </div>
            </div>
          </div>

          <div className='mt-auto'>
            <div className='mb-4 flex justify-end'>
              <img
                src='/assets/images/finish_pig.png'
                alt='Pig'
                className='h-60 w-60'
              />
            </div>

            <div className='mb-3'>
              <Button
                label='나의 계좌로 이동하기'
                size='large'
                color='orange'
                className='w-full py-4'
                onClick={() => navigate('/account/check')}
              />
            </div>
          </div>
        </div>

        {/* 미션 성공 모달 */}
        {isModalOpen && (
          <MissionSuccessModal
            name='계좌 이체'
            onConfirm={() => setIsModalOpen(false)}
          />
        )}
      </MainWrapper>
    </div>
  );
};

export default AccountTransferSuccess;
