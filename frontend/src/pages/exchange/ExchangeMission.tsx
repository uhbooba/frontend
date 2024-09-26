import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import TextBubble from '@/components/common/TextBubble';

const ExchangeMission = () => {
  const navigate = useNavigate();

  const GoExplain = () => {
    navigate('/exchange/explain');
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
                경로당에서 해외여행을 <br />
                준비 중입니다. <br />
                해외에서 사용할 경비를 <br />
                <span className='text-bold text-primary'>30달러</span>로
                환전하려고
                <br /> 합니다.
              </p>
              <br />
              <p className='text-4xl font-bold'>
                원화를 달러로 <br />
                환전하세요!
              </p>
              <div className='ml-8 mr-8'>
                <Button
                  label='환전하러가기'
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
            loading='lazy'
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangeMission;
