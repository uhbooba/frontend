import { BottomTab } from '@/components/layouts/BottomTab';
import Button from '@/components/common/buttons/Button';
import OnlyXTopBar from '@/components/layouts/OnlyXTopBar';

const DepositSuccess2 = () => {
  return (
    <div className='flex min-h-screen flex-col bg-white'>
      {/* 상단바 */}
      <OnlyXTopBar title='예금 가입' />

      {/* 배경 이미지 설정 */}
      <div
        className='relative flex flex-grow flex-col justify-between px-4 pt-8'
        style={{
          backgroundImage: `url("/assets/images/money_rain.png")`,
          backgroundSize: '420px auto',
          backgroundPosition: 'center -50px',
          // 이미지 한장만 나오게하고싶으면 나중ㅇ테 이거 주석 해제하면 됨
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div className='z-10 mt-4 text-center'>
          <p className='text-5xl font-bold'>예금 상품</p>
          <p className='mt-2 text-5xl font-bold'>가입 성공</p>
        </div>

        {/* 말풍선 부분 */}
        <div className='relative z-10 mt-24 w-[290px] font-bold'>
          <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-6'>
            <p className='text-start text-xl text-black'>
              예금 상품 가입 완료!
            </p>
            <p className='mt-2 text-start text-xl text-black'>
              이제 만기일까지 기다리면
            </p>
            <p className='mt-4 text-start text-xl text-black'>
              나중에 많은 이자와 함께
            </p>
            <p className='text-start text-xl text-black'>목돈이 돌아올거야!</p>

            {/* 말풍선 꼬리 부분 */}
            <div className='absolute bottom-[-22px] left-[70%] -translate-x-1/2 transform'>
              {/* 바깥쪽 삼각형*/}
              <div className='h-0 w-0 border-l-[22px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300'></div>

              {/* 안쪽 삼각형*/}
              <div className='absolute left-[50%] top-[-1px] h-0 w-0 -translate-x-1/2 transform border-l-[20px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100'></div>
            </div>

            {/* Tip! 삼각형 자체를 테두리로 만들어야해서, 삼각형에 테두리를 주려면 크기와 색깔이 다른 삼각형을 겹쳐서 만들어야 한다. */}
          </div>
        </div>

        <div className='z-10 mt-auto'>
          {/* 돼지 이미지 */}
          <div className='mb-4 flex justify-end'>
            <img
              src='/assets/images/finish_pig.png'
              alt='Pig'
              className='h-60 w-60'
            />
          </div>

          {/* 버튼 */}
          <div className='mb-24'>
            <Button
              label='나의 계좌로 이동하기'
              size='large'
              color='orange'
              className='w-full py-4'
            />
          </div>
        </div>
      </div>

      {/* 바텀탭 */}
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default DepositSuccess2;
