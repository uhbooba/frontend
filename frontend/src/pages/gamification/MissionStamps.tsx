import { useState, useEffect } from 'react';
import TopBar from '@/components/layouts/TopBar';
import TextBubble from '@/components/common/TextBubble';
import Stamp from '@/components/gamification/MissionStamp';
import MainWrapper from '@/components/layouts/MainWrapper';

import { getMissionClearStatus } from '@/services/mission';

const MissionStamp = () => {
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

  const [missionStatus, setMissionStatus] = useState<boolean[]>(
    new Array(stampsInfo.length).fill(false),
  );

  useEffect(() => {
    const fetchMissionResults = async () => {
      const results: boolean[] = [];
      for (let i = 0; i < stampsInfo.length; i++) {
        try {
          const response = await getMissionClearStatus(i + 1); // assuming mission numbers are 1-based
          results.push(response.result); // store the completion status
        } catch (error) {
          console.error('Error fetching mission status:', error);
          results.push(false); // handle error by marking it as incomplete
        }
      }
      setMissionStatus(results); // update state after all results are fetched
    };

    fetchMissionResults();
  }, []);

  return (
    <div className='flex h-screen flex-col bg-yellow-100'>
      <div className='w-full'>
        <TopBar title='나의 스탬프' showXButton={false} />
      </div>
      <MainWrapper isBottomTab={true}>
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
              className='mt-4 h-32 w-32'
            />
          </div>
          <div className='mt-4 w-10/12 rounded-lg bg-white p-6 text-center text-2xl shadow-md'>
            <p className='mb-4'>내가 모은 스탬프</p>
            <div className='grid grid-cols-3 gap-4'>
              {stampsInfo.map((stamp, index) => (
                <Stamp
                  key={index}
                  isCompleted={missionStatus[index]}
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
