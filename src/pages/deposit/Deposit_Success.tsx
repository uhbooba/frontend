import XTopBar from '@/components/layouts/XTopbar';
import { BottomTab } from '@/components/layouts/BottomTab';
import Button from '@/components/common/buttons/Button';

const DepositSuccess = () => {


  return (
    <div>
      {/* 상단바 */}
      <XTopBar title='예금 가입7 - 가입성공' />

      <div className="absolute bottom-24 left-0 flex w-full justify-between space-x-4 px-4">

        <Button
          label="나의 계좌로 이동하기"
          size="medium"
          color="orange"
        />
      </div>

      {/* 바텀탭 */}
      <div className="fixed bottom-0 left-0 w-full">
        <BottomTab />
      </div>
    </div>
  );
};

export default DepositSuccess;
