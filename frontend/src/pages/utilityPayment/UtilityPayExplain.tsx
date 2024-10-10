import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import TextBubble from '@/components/common/TextBubble';
import MainWrapper from '@/components/layouts/MainWrapper';

const UtilityPayExplain = () => {
  const navigate = useNavigate();

  const GoNext = () => {
    navigate('/utility/input');
  };

  return (
    <div className='bg-yellow-100'>
      <TopBar title='공과금 납부' />
      <MainWrapper>
        <div className='flex flex-col items-center justify-center'>
          <TextBubble
            bubbleSize='w-10/12'
            content={
              <>
                <p className='text-2xl font-bold'>공과금 납부란?</p>
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
              전기, 가스, 수도 등 <br /> 생활에 필요한 공과금을 <br />
              납부하는 과정을 말해요.
            </p>
            <p className='mb-4'>
              종이 고지서나 <br /> 전자 고지서에 나온 <br />
              납부 정보를 입력하면 <br /> 은행에 가지 않고도 <br />
              모바일에서 간편하게 공과금을 납부할 수 있어요.
            </p>

            <Button label='직접 납부해보기' onClick={GoNext} />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default UtilityPayExplain;
