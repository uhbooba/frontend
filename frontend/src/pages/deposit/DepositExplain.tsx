import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';
import TitleText from '@/components/common/TitleText';

const DepositExplain = () => {
  const navigate = useNavigate();

  const GoSignup = () => {
    navigate('/deposit/agree');
  };
  return (
    <div>
      <TopBar title='예금 가입' />
      <MainWrapper>
        <div>
          <div className='text-center'>
            <TitleText>예금이란?</TitleText>
          </div>
          <div className=''>
            <p className='ml-4 mt-2 text-start text-lg font-bold'>
              <span className='text-yellow-400'>일정기간</span> 은행에{' '}
              <span className='text-yellow-400'>큰 돈</span>을 맡겨두고 기간이
              끝나면 <br />
              원금과 높은 이자율의 이자를 받을 수 있어요.
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              <p className='text-xl font-bold'>1. 정기예금</p>
              다른 상품보다 이자율이 더 높아요. <br />
              기간이 길수록 이자율이 더 높아져요. <br />
              시니어 분들에게 추천하는 상품입니다.
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              <p className='text-xl font-bold'>2. 파킹통장 (자유이자통장)</p>
              언제나 자유롭게 입출금이 가능해요. <br />
              정기예금보다 낮지만, 자유입출금보다 높은 <br /> 이자율을 제공해요.
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              적금은 보통 정기예금보다 이자율이 높아요. <br />
              다만, 예금과 이자 계산 방법이 다릅니다.
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              <span className='font-bold text-yellow-400'>목돈</span>을 넣어두고
              <span className='font-bold text-yellow-400'> 많은 이자</span>를
              받고 싶을 때 <br /> 추천하는 상품입니다.
            </p>
          </div>
        </div>

        {/* 말풍선 부분 */}
        <div className='relative ml-16 mt-8 w-[255px]'>
          <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-3'>
            <p className='text-center text-lg text-black'>
              만기까지 기다리기만 하면
            </p>
            <p className='text-center text-lg text-black'>
              많은 이자를 받을 수 있어!
            </p>

            {/* 말풍선 꼬리 부분 */}
            <div className='absolute bottom-[-22px] left-[80%] -translate-x-1/2 transform'>
              {/* 바깥쪽 삼각형*/}
              <div className='h-0 w-0 border-l-[22px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300'></div>

              {/* 안쪽 삼각형*/}
              <div className='absolute left-[50%] top-[-1px] h-0 w-0 -translate-x-1/2 transform border-l-[20px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100'></div>
            </div>

            {/* Tip! 삼각형 자체를 테두리로 만들어야해서, 삼각형에 테두리를 주려면 크기와 색깔이 다른 삼각형을 겹쳐서 만들어야 한다. */}
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <img
            src='/assets/images/deposit_pig.png'
            alt='Pig'
            className='ml-32 mt-4 h-56 w-56'
          />
        </div>

        {/* 확인 버튼 */}
        <div className='w-full items-center justify-center p-4'>
          <Button
            label='확인'
            size='large'
            color='orange'
            onClick={() => GoSignup()}
          />
        </div>
      </MainWrapper>
    </div>
  );
};

export default DepositExplain;
