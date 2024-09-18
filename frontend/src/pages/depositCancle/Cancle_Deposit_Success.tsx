import { BottomTab } from '@/components/layouts/BottomTab';
import Button from '@/components/common/buttons/Button';
import OnlyXTopBar from '@/components/layouts/OnlyXTopBar';

const CancleDepositSuccess = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 상단바 */}
      <OnlyXTopBar title="예금 중도해지" />

        <div className="text-center z-10">
          <p className="text-5xl font-bold mt-24">예금 상품</p>
          <p className="text-5xl font-bold mt-4">중도해지 완료</p>
        </div>

        {/* 말풍선 부분 */}
        <div className="relative mt-24 ml-32 w-[270px] z-10">
            <div className="relative p-4 rounded-lg bg-gray-100 border-2 border-gray-300 font-bold">
                <p className="text-lg text-start text-black">성공적으로 상품 중도해지를</p>
                <p className="text-lg text-start text-black">완료했습니다.</p>
                <p className="text-lg text-start text-black">원금과 이자는 가입하셨던</p>
                <p className="text-lg text-start text-black">계좌로 입급됩니다.</p>

                {/* 말풍선 꼬리 부분 */}
                <div className="absolute bottom-[-22px] left-[15%] transform -translate-x-1/2">
                {/* 바깥쪽 삼각형*/}
                <div className="h-0 w-0 border-l-[2px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300"></div>

                {/* 안쪽 삼각형*/}
                <div className="h-0 w-0 border-l-[2px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100 absolute top-[-1px] left-[50%] transform -translate-x-1/2"></div>
                </div>
            </div>
            </div>

        <div className="mt-4">
          {/* 돼지 이미지 */}
          <div className="flex justify-start">
            <img
              src="/assets/images/pig.png"
              alt="Pig"
              className="h-60 w-60"
            />
          </div>
        </div>


        {/* 버튼 */}
        <div className="fixed bottom-24 w-full pl-4 pr-4">
            <Button
              label="나의 계좌로 이동하기"
              size="large"
              color="orange"
              className="py-4 w-full"
            />
        </div>
      

      {/* 바텀탭 */}
      <div className="fixed bottom-0 left-0 w-full">
        <BottomTab />
      </div>
    </div>
  );
};

export default CancleDepositSuccess;
