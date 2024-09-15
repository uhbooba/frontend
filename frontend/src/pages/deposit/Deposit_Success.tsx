import XTopBar from '@/components/layouts/XTopbar';
import { BottomTab } from '@/components/layouts/BottomTab';
import Button from '@/components/common/buttons/Button';

const DepositSuccess = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 상단바 */}
      <XTopBar title="계좌 생성" />

      {/* 배경 이미지 설정 */}
      <div
        className="flex-grow flex flex-col justify-between px-4 pt-8 relative"
        style={{
          backgroundImage: `url("/assets/images/money_rain.png")`, 
          backgroundSize: "400px auto",
          backgroundPosition: "center -50px",
          // 이미지 한장만 나오게하고싶으면 나중ㅇ테 이거 주석 해제하면 됨 
          // backgroundRepeat: "no-repeat", 
        }}
      >
        <div className="text-center mt-4 z-10">
          <p className="text-5xl font-bold">예금 상품</p>
          <p className="text-5xl font-bold mt-2">가입 성공</p>
        </div>

        {/* 말풍선 부분 */}
        <div className="relative mt-16 mx-auto w-[360px] z-10">
          <div className="relative p-6 rounded-lg bg-gray-100 border-2 border-gray-300">
            <p className="text-xl text-start text-black">축하합니다~</p>
            <p className="text-xl text-start text-black mt-2">
              5단계 미션을 성공했어요!
            </p>
            <p className="text-xl text-start text-black mt-4">다음 미션에서는</p>
            <p className="text-xl text-start text-black">
              공과금 납부를 해볼거에요~
            </p>

            {/* 말풍선 꼬리 부분 */}
            <div className="absolute bottom-[-22px] left-[70%] transform -translate-x-1/2">
              {/* 바깥쪽 삼각형*/}
              <div className="h-0 w-0 border-l-[22px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300"></div>

              {/* 안쪽 삼각형*/}
              <div className="h-0 w-0 border-l-[20px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100 absolute top-[-1px] left-[50%] transform -translate-x-1/2"></div>
            </div>

            {/* Tip! 삼각형 자체를 테두리로 만들어야해서, 삼각형에 테두리를 주려면 크기와 색깔이 다른 삼각형을 겹쳐서 만들어야 한다. */}
          </div>
        </div>

        <div className="mt-auto z-10">
          {/* 돼지 이미지 */}
          <div className="flex justify-end mb-4">
            <img
              src="/assets/images/finish_pig.png"
              alt="Pig"
              className="h-60 w-60"
            />
          </div>

          {/* 버튼 */}
          <div className="mb-24">
            <Button
              label="나의 계좌로 이동하기"
              size="large"
              color="orange"
              className="py-4 w-full"
            />
          </div>
        </div>
      </div>

      {/* 바텀탭 */}
      <div className="fixed bottom-0 left-0 w-full">
        <BottomTab />
      </div>
    </div>
  );
};

export default DepositSuccess;
