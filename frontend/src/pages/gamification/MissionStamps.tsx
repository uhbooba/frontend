import { useState, useEffect } from 'react';
import TopBar from '@/components/layouts/TopBar';
import TextBubble from '@/components/common/TextBubble';
import Stamp from '@/components/gamification/MissionStamp';
import MainWrapper from '@/components/layouts/MainWrapper';
import { getMissionsClearStatus } from '@/services/mission';

interface Mission {
  isCleared: boolean;
}

const MissionStamp = () => {
  const [missionStatus, setMissionStatus] = useState<boolean[]>([]); // 미션 완료 여부 저장

  const stampsInfo = [
    {
      missionName: '로그인',
    },
    {
      missionName: '계좌 생성',
    },
    {
      missionName: '계좌 이체',
    },
    {
      missionName: '적금 가입 \n (자동 납부)',
    },
    {
      missionName: '예금 해지',
    },
    {
      missionName: '공과금 납부',
    },
    {
      missionName: '환전',
    },
  ];

  useEffect(() => {
    // 모든 미션 클리어 확인하는 API 호출
    const fetchMissionsStatus = async () => {
      try {
        const response = await getMissionsClearStatus();
        const missionStates = response.result.map(
          (mission: Mission) => mission.isCleared,
        );
        setMissionStatus(missionStates); // 미션 완료 상태 배열로 설정
      } catch (error) {
        console.error('getMissionsClearStatus 에러', error);
      }
    };

    fetchMissionsStatus();
  }, []);

  return (
    <div className='flex h-screen flex-col bg-yellow-100'>
      <div className='w-full'>
        <TopBar title='나의 스탬프' showXButton={false} />
      </div>
      <MainWrapper>
        <div className='relative flex flex-col items-center'>
          <TextBubble
            bubbleSize='w-10/12'
            content={
              <>
                <p className='text-2xl font-bold'>미션을 해결하면</p>
                <p className='text-2xl font-bold'>스탬프가 찍혀요.</p>
              </>
            }
          />
          <div className='flex items-center justify-center'>
            <img
              src='/assets/images/pig.png'
              alt='Pig'
              className='w-d32 mt-4 h-32'
            />
          </div>
          <div className='mt-4 w-10/12 rounded-lg bg-white p-6 text-center text-2xl shadow-md'>
            <p className='mb-4'>내가 모은 스탬프</p>
            <div className='grid grid-cols-3 gap-4'>
              {stampsInfo.map((stamp, index) => (
                <Stamp
                  key={index}
                  isCompleted={missionStatus[index] || false} // 미션 상태가 없으면 false로 처리
                  missionName={stamp.missionName}
                />
              ))}
            </div>
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default MissionStamp;
