import Button from '@/components/common/buttons/Button';
import BackButton from '@/components/common/buttons/BackButton';
import { useNavigate } from 'react-router';

const DepositMission = () => {
  const navigate = useNavigate();

  const GoExplain = () => {
    navigate('/explain');
  };
  return (
    <div className='bg-yellow-100'>
      <div className='bg-gray-400 text-center'>
        <span>여기는 휴대폰 상단 상태바</span>
      </div>

      {/* 상단바 */}
      <div className='flex items-center justify-between border-b-4 bg-white py-4'>
        <BackButton className='ml-4' />
        <span className='absolute left-1/2 -translate-x-1/2 transform text-xl font-bold'>
          예금 가입
        </span>
      </div>

      {/* 돼지 말풍선 부분 */}
      <div className='relative flex min-h-screen flex-col items-center'>
        {/* 말풍선 스타일 적용 */}
        <div className='relative mt-8 h-[440px] w-[360px] rounded-lg bg-white'>
          <div className='mt-8 text-center'>
            <p className='text-4xl font-bold'>5단계 미션</p> <br />
            <p className='text-2xl'>
              이수자 할아버지는 <br />
              퇴직금을 안전하게 <br />
              관리하기 위해서 <br />
              <span className='text-yellow-400'>예금상품</span>을 가입하려고
              합니다.
            </p>
            <br />
            <p className='text-4xl font-bold'>
              3가지 상품 중에서 <br />
              예금상품 하나를 <br />
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
            src='assets/images/pig.png'
            alt='Pig'
            className='mt-4 h-56 w-56'
          />
        </div>
      </div>
    </div>
  );
};

export default DepositMission;
