import Button from '@/components/common/buttons/Button';
import MainWrapper from '@/components/layouts/MainWrapper';
import TopBar from '@/components/layouts/TopBar';
import { useNavigate } from 'react-router';

const Savings = () => {
  const navigate = useNavigate();

  const GoSignup = () => {
    navigate('/savings/agree');
  };

  return (
    <div>
      <TopBar title='적금 가입' />
      <MainWrapper>
        <div>
          <div className='text-center'>
            <p className='text-3xl font-bold'>적금이란?</p>
          </div>
          <div className=''>
            <p className='ml-4 mt-2 text-start text-lg font-bold'>
              매달 일정 금액을 정해진 기간 동안 저축하고, <br />
              만기시 원금과 이자를 받는 금융상품입니다.
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              적금은 매월 혹은{' '}
              <span className='font-bold text-yellow-400'>일정 주기</span>마다
              <span className='font-bold text-yellow-400'>
                {' '}
                일정 금액
              </span>을 <br />
              <span className='font-bold text-yellow-400'> 저축</span>해야
              합니다.
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              가입할 때 정한 기간이 끝나면 원금과 이자를 <br />
              함께 돌려받습니다.
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              적금은 보통 정기예금보다 이자율이 높아요. <br />
              다만, 예금과 이자 계산 방법이 다릅니다.
            </p>

            <p className='ml-4 mt-4 text-start text-lg font-bold'>
              <span className='font-bold text-yellow-400'>목돈을 마련</span>하고
              싶을 때 추천하는 상품입니다.
            </p>
          </div>
        </div>

        {/* 말풍선 부분 */}
        <div className='relative ml-16 mt-8 w-[255px]'>
          <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-3'>
            <p className='text-center text-lg text-black'>
              매달 열심히 적금을 하면
            </p>
            <p className='text-center text-lg text-black'>
              나중에 목돈이 될거야!
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

        <div className=''>
          {/* 돼지 이미지 */}
          <div className='flex items-center justify-center'>
            <img
              src='assets/images/savings_pig.png'
              alt='Pig'
              className='ml-32 mt-4 h-56 w-56'
            />
          </div>
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

export default Savings;
