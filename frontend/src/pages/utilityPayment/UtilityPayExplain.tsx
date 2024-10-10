import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';
import TitleText from '@/components/common/TitleText';

const UtilityPayExplain = () => {
  const navigate = useNavigate();

  const GoNext = () => {
    navigate('/utility/input');
  };

  return (
    <div>
      <TopBar title='공과금 납부' />
      <MainWrapper>
        <div>
          <div className='text-center'>
            <TitleText>공과금 납부란?</TitleText>
          </div>
          <div className=''>
            <p className='ml-4 mt-2 text-start text-lg font-bold'>
              전기, 가스, 수도 등 생활에 필요한 공과금을 <br />
              납부하는 과정을 의미합니다!
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              종이 고지서 혹은 전자 고지서에 나온 <br />
              납부 정보를 입력하면{' '}
              <span className='font-bold text-yellow-400'>
                은행에 가지 않고도
              </span>{' '}
              <br />
              <span className='font-bold text-yellow-400'>모바일로</span>{' '}
              간편하게{' '}
              <span className='font-bold text-yellow-400'>공과금을 납부</span>할
              수 있어요
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              종이 고지서의 경우 보통 QR 코드가 있습니다. <br />
              해당 <span className='font-bold text-yellow-400'>QR 코드</span>를
              휴대폰{' '}
              <span className='font-bold text-yellow-400'>카메라로 촬영</span>
              하면 <br />
              휴대폰으로{' '}
              <span className='font-bold text-yellow-400'>모바일 납부</span>를
              할 수 있습니다!
            </p>
          </div>
        </div>

        {/* 말풍선 부분 */}
        <div className='relative ml-16 mt-8 w-[255px]'>
          <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-3'>
            <p className='text-center text-lg text-black'>
              은행에 가지 않고 집에서
            </p>
            <p className='text-center text-lg text-black'>
              편안하게 공과금을 낼거야!
            </p>

            <div className='absolute bottom-[-22px] left-[80%] -translate-x-1/2 transform'>
              <div className='h-0 w-0 border-l-[22px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300'></div>
              <div className='absolute left-[50%] top-[-1px] h-0 w-0 -translate-x-1/2 transform border-l-[20px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100'></div>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <img
            src='/assets/images/utilpay_pig.png'
            alt='Pig'
            className='ml-32 mt-4 h-56 w-56'
          />
        </div>

        {/* 확인 버튼 */}
        <div className='w-full items-center justify-center p-4'>
          <Button
            label='직접 납부해보기'
            size='large'
            color='orange'
            onClick={() => GoNext()}
          />
        </div>
      </MainWrapper>
    </div>
  );
};

export default UtilityPayExplain;
