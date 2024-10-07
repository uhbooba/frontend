import { BottomTab } from '@/components/layouts/BottomTab';
import Button from '@/components/common/buttons/Button';
import TopBar from '@/components/layouts/TopBar';
import { useNavigate } from 'react-router';

const CancelDepositMission = () => {
  const navigate = useNavigate();

  const GoNext = () => {
    navigate('/cancel/deposit/explain');
  };

  return (
    <div className='min-h-screen bg-yellow-100'>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='예금 중도해지' />
      </div>

      {/* 돼지 말풍선 부분 */}
      <div className='relative mt-8 flex flex-col items-center'>
        {/* 말풍선 스타일 적용 */}
        <div className='relative mt-20 h-[440px] w-[360px] rounded-lg bg-white'>
          <div className='mt-8 text-center'>
            <p className='text-4xl font-bold'>5단계 미션</p> <br />
            <p className='text-2xl'>
              이수자 할아버지는 <br />
              큰 돈이 필요해져서 <br />
              가입했던 예금상품을 <br />
              <span className='text-yellow-400'>중도해지</span> 하려고 합니다.
            </p>
            <br />
            <p className='text-4xl font-bold'>
              가입하셨던 <br />
              예금 상품을 <br />
              중도해지 해보세요!
            </p>
            <div className='pl-8 pr-8'>
              <Button
                label='중도해지 하러가기'
                size='small'
                color='orange'
                onClick={() => GoNext()}
                className='mt-4'
              />
            </div>
          </div>

          {/* 말풍선 꼬리 부분 */}
          <div className='absolute bottom-[-29px] left-[155px] h-0 w-0 border-l-[30px] border-r-[30px] border-t-[30px] border-solid border-l-transparent border-r-transparent border-t-white'></div>
        </div>

        {/* 돼지 이미지 */}
        <div className='flex items-center justify-center'>
          <img
            src='/assets/images/pig.png'
            alt='Pig'
            className='mt-4 h-56 w-56'
          />
        </div>
      </div>

      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default CancelDepositMission;
