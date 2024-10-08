import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';

const AccountOpenMission = () => {
  const navigate = useNavigate();

  const GoExplain = () => {
    navigate('/savings');
  };

  return (
    <div className='min-h-screen bg-yellow-100'>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='계좌 생성' />
      </div>

      {/* 돼지 말풍선 부분 */}
      <div className='relative mt-8 flex flex-col items-center'>
        {/* 말풍선 스타일 적용 */}
        <div className='relative mt-20 h-[440px] w-[360px] rounded-lg bg-white'>
          <div className='mt-8 text-center'>
            <p className='text-4xl font-bold'>2단계 미션</p> <br />
            <p className='text-2xl'>
              이수자 할아버지는 <br />
              경로당에서 사용할 <br />
              새 계좌를 만들려고 합니다. <br />
              경로당 모임비를 <br />
              따로 관리하기 위한 <br />
              <span className='text-yellow-400'>새로운 계좌</span>가 필요합니다.
            </p>
            <br />
            <p className='text-4xl font-bold'>
              수시입출금 계좌를 <br />
              가입해보세요!
            </p>
            <div className='pl-8 pr-8'>
              <Button
                label='가입하러가기'
                size='small'
                color='orange'
                onClick={() => GoExplain()}
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
            alt='pig'
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

export default AccountOpenMission;
