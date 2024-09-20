import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import TotalTopBar from '@/components/layouts/TotalTopBar';

const DepositExplain = () => {
  const navigate = useNavigate();

  const GoSignup = () => {
    navigate('/deposit/agree');
  };
  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TotalTopBar
          title='예금 가입'
          showBackButton={true}
          showXButton={true}
        />
      </div>

      {/* 말풍선 스타일 적용 */}
      <div>
        <div className='mt-20 text-center'>
          <p className='text-3xl font-bold'>예금이란?</p>
        </div>
        <div className='text-center'>
          <p className='mt-2 text-xl'>
            은행에 돈을 맡기고, 이자를 받는 <br /> 금융상품이에요.
          </p>
          <p className='mt-4'>
            <span className='text-yellow-400'>일정기간</span> 은행에{' '}
            <span className='text-yellow-400'>큰 돈</span>을 맡겨두고 기간이
            끝나면 <br />
            원금과 높은 이자율의 이자를 받을 수 있어요.
          </p>
          <p className='mt-4'>
            <p className='text-xl font-bold'>1. 정기예금</p>
            다른 상품보다 이자율이 더 높아요. <br />
            기간이 길수록 이자율이 더 높아져요. <br />
            시니어 분들에게 추천하는 상품입니다.
          </p>
          <p className='mt-4'>
            <p className='text-xl font-bold'>2. 파킹통장 (자유이자통장)</p>
            언제나 자유롭게 입출금이 가능해요. <br />
            정기예금보다 낮지만, 자유입출금보다 높은 <br /> 이자율을 제공해요.
          </p>
        </div>
      </div>

      <div className=''>
        {/* 돼지 이미지 */}
        <div className='flex items-center justify-center'>
          <img
            src='/assets/images/deposit_pig.png'
            alt='Pig'
            className='ml-32 mt-8 h-56 w-56'
          />
        </div>

        {/* 확인 버튼 */}
        <div className='mb-2 w-full items-center justify-center p-4'>
          <Button
            label='확인'
            size='large'
            color='orange'
            onClick={() => GoSignup()}
          />
        </div>
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default DepositExplain;
