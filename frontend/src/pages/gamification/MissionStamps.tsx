import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';
import TextBubble from '@/components/common/TextBubble';
import Stamp from '@/components/gamification/MissionStamp';

const MissionStamp = () => {
  const stampsInfo = [
    {
      isCompleted: true,
      missionName: '계좌 생성 \n 마스터'
    },
    {
      isCompleted: false,
      missionName: '계좌 이체 \n 마스터'
    },
    {
      isCompleted: false,
      missionName: '자동 납부 \n 마스터'
    },
    {
      isCompleted: false,
      missionName: '정기 예금 \n 마스터'
    },
    {
      isCompleted: false,
      missionName: '공과금 납부 \n 마스터'
    },
    {
      isCompleted: false,
      missionName: '환전 \n 마스터'
    },
  ]

  return (
    <div className='flex h-screen flex-col bg-yellow-100'>
      <div className='w-full'>
        <TopBar title='나의 스탬프' showXButton={false} />
      </div>
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
                  isCompleted={stamp.isCompleted}
                   missionName={stamp.missionName}
                />
              ))}
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default MissionStamp;
