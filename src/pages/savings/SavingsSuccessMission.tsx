import Button from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { setMissionClearStatus } from '@/services/mission';
import MissionSuccessModal from '@/components/modals/MissionSuccessModal';
import MainWrapper from '@/components/layouts/MainWrapper';

const SavingsSuccessMission = () => {
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // 미션 성공하면 뜨는 모달

  // 미션 성공하면 1초 있다가 성공모달 뜨게 하기
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccessModalOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 4단계 미션 성공했다고 api 보내기
  useEffect(() => {
    const clearMission = async () => {
      try {
        await setMissionClearStatus(4); // 적금가입 4단계 미션 성공 보내기
      } catch (error) {
        console.error('setMissionClearStatus 에러', error);
      }
    };

    clearMission();
  }, []);

  const GoNext = () => {
    navigate('/');
  };

  return (
    <div>
      <TopBar title='적금 가입' showBackButton={false} />
      <MainWrapper>
        {/* 배경 이미지 설정 */}
        <div
          className='relative flex flex-grow flex-col justify-between px-4 pt-8'
          style={{
            backgroundImage: `url("/assets/images/money_rain.png")`,
            backgroundSize: '420px auto',
            backgroundPosition: 'center -50px',
            // 이미지 한장만 나오게하고싶으면 나중ㅇ테 이거 주석 해제하면 됨
            // backgroundRepeat: "no-repeat",
          }}
        >
          <div className='mt-4 text-center'>
            <p className='text-5xl font-bold'>적금 상품</p>
            <p className='mt-2 text-5xl font-bold'>가입 성공</p>
          </div>

          {/* 말풍선 부분 */}
          <div className='relative mt-24 w-[290px] font-bold'>
            <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-6'>
              <p className='text-start text-xl text-black'>축하합니다~~</p>
              <p className='mt-2 text-start text-xl text-black'>
                4단계 미션을 성공했어요!
              </p>
              <p className='mt-4 text-start text-xl text-black'>
                다음 미션에서는 가입한
              </p>
              <p className='text-start text-xl text-black'>
                예금 중도해지를 해봐요!
              </p>

              {/* 말풍선 꼬리 부분 */}
              <div className='absolute bottom-[-22px] left-[70%] -translate-x-1/2 transform'>
                {/* 바깥쪽 삼각형*/}
                <div className='h-0 w-0 border-l-[22px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300'></div>

                {/* 안쪽 삼각형*/}
                <div className='absolute left-[50%] top-[-1px] h-0 w-0 -translate-x-1/2 transform border-l-[20px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100'></div>
              </div>

              {/* Tip! 삼각형 자체를 테두리로 만들어야해서, 삼각형에 테두리를 주려면 크기와 색깔이 다른 삼각형을 겹쳐서 만들어야 한다. */}
            </div>
          </div>

          <div className='mt-auto'>
            {/* 돼지 이미지 */}
            <div className='mb-4 flex justify-end'>
              <img
                src='/assets/images/finish_pig.png'
                alt='Pig'
                className='h-60 w-60'
              />
            </div>

            {/* 버튼 */}
            <div className='mb-10 mt-12'>
              <Button
                label='메인화면으로 이동하기'
                size='large'
                color='orange'
                className='w-full py-4'
                onClick={() => GoNext()}
              />
            </div>
          </div>
        </div>

        {/* 미션 성공 모달 */}
        {isSuccessModalOpen && (
          <MissionSuccessModal
            name='적금 가입'
            onConfirm={() => setIsSuccessModalOpen(false)}
          />
        )}
      </MainWrapper>
    </div>
  );
};

export default SavingsSuccessMission;
