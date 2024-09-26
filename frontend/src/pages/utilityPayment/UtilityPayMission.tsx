import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import TextBubble from '@/components/common/TextBubble';

const UtilityPayMission = () => {
  const navigate = useNavigate();

  const GoExplain = () => {
    navigate('/utility/explain');
  };

  return (
    <div className='min-h-screen bg-yellow-100'>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='환전' />
      </div>
      <div className='relative mt-8 flex flex-col items-center'>
        <TextBubble
          bubbleSize='w-11/12'
          content={
            <>
              <p className='text-4xl font-bold'>7단계 미션</p> <br />
              <p className='text-2xl'>
                이수자 할아버지는 <br />
                이번 달 전기 요금을 <br />
                은행에 갈 필요 없이 <br />
                모바일로 요금을 <br />
                납부하려고 합니다.
              </p>
              <br />
              <p className='text-4xl font-bold'>
                전기 요금을 <br />
                납부하세요!
              </p>
              <div className='ml-8 mr-8'>
                <Button
                  label='납부하러가기'
                  size='small'
                  color='orange'
                  onClick={() => GoExplain()}
                  className='mt-4'
                />
              </div>
            </>
          }
        />
        <div className='flex items-center justify-center'>
          <img
            src='/assets/images/pig.png'
            alt='Pig'
            className='mt-4 h-56 w-56'
          />
        </div>
      </div>
    </div>
  );
};

export default UtilityPayMission;
