import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import TextBubble from '@/components/common/TextBubble';
import MainWrapper from '@/components/layouts/MainWrapper';

const ExchangeExplain = () => {
  const navigate = useNavigate();

  const GoAgree = () => {
    navigate('/exchange/agree');
  };

  return (
    <div className='bg-yellow-100'>
      <TopBar title='환전' />
      <MainWrapper>
        <div className='flex flex-col items-center'>
          <TextBubble
            bubbleSize='w-10/12'
            content={
              <>
                <p className='text-2xl font-bold'>환전이란?</p>
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
          <div className='mt-4 w-10/12 rounded-lg bg-white p-6 text-center text-xl shadow-md'>
            <p className='mb-4'>
              우리나라 돈(원화)을 <br /> 외국 돈(외화)으로 바꾸거나, <br />{' '}
              외화를 원화로 바꾸는 것을 말해요.
            </p>
            <p className='mb-4'>
              해외여행을 갈 때 <br /> 꼭 필요한 과정이에요.
            </p>
            <p className='mb-4'>
              환전할 때는 <span className='font-bold text-primary'>환율</span>
              을 <br /> 꼭 확인해야 해요! <br />
              환율이 낮을 때 환전하면 <br /> 더 많은 돈을 받을 수 있어요.
            </p>
            <Button label='직접 해보기' onClick={GoAgree} />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default ExchangeExplain;
