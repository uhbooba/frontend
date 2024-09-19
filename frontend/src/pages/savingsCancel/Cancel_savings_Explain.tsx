import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import XTopBar from '@/components/layouts/XTopbar';

const CancelSavingsExplain = () => {
  const navigate = useNavigate();

  const GoNext = () => {
    navigate('/cancel/savings/product');
  };
  return (
    <div className=''>
      <XTopBar title='적금 중도해지' />

      <div>
        <div className='mt-8 text-center'>
          <p className='text-3xl font-bold'>적금 중도해지</p>
        </div>
        <div className='ml-4 mt-4 text-start text-lg font-bold'>
          <p>적금 중도해지는 정해긴 기간이 끝나기 전에</p>
          <p className='mb-4'>적금을 해지하는 것입니다.</p>

          <p>중도해지 하는 경우에는 처음 정한 이자가 아닌</p>
          <p className='mb-4'>중도해지 이자율이 따로 적용됩니다.</p>
          <p>중도해지 이자율은 보통 매우 낮은 편으로</p>
          <span className='text-yellow-400'>이자 손실이 매우 큽니다. </span>

          <p className='mt-4'>갑작스러운 큰 돈이 필요한 경우가 아니라면</p>
          <p>정해진 기간(만기)까지 유지하는 게 유리합니다.</p>
        </div>
      </div>

      <div>
        <div className=''>
          <img
            src='/assets/images/sad_pig.png'
            alt='Pig'
            className='fixed bottom-32 mb-2 h-56 w-56'
          />
        </div>
        {/* 말풍선 부분 */}
        <div className='relative z-10 ml-36 mt-4 w-[245px]'>
          <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-4 font-bold'>
            <p className='text-start text-lg text-black'>
              중도해지를 하면 이자가
            </p>
            <p className='text-start text-lg text-black'>많이 줄어듭니다.</p>
            <p className='text-start text-lg text-black'>
              정말 해지하실건가요?
            </p>

            {/* 말풍선 꼬리 부분 */}
            <div className='absolute bottom-[-22px] left-[15%] -translate-x-1/2 transform'>
              {/* 바깥쪽 삼각형*/}
              <div className='h-0 w-0 border-l-[2px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300'></div>

              {/* 안쪽 삼각형*/}
              <div className='absolute left-[50%] top-[-1px] h-0 w-0 -translate-x-1/2 transform border-l-[2px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100'></div>
            </div>
          </div>
        </div>
      </div>

      {/* 확인 버튼 */}
      <div className='fixed bottom-24 w-full pl-4 pr-4'>
        <Button
          label='중도해지 하러가기'
          size='large'
          color='orange'
          onClick={() => GoNext()}
        />
      </div>

      <div className='fixed bottom-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default CancelSavingsExplain;
