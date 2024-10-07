import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import AccountInfo from '@/components/common/AccountInfo';
import { CiCirclePlus } from 'react-icons/ci';
import { useNavigate } from 'react-router';

const AccountList = () => {
  const navigate = useNavigate();
  return (
    <div className=''>
      <TopBar title='계좌 목록' showXButton={false} />
      <div className='flex flex-col items-center justify-center'>
        {/* 지금은 하드 코딩으로 계좌 넣어둠. 추후 수정 예정 */}
        <AccountInfo
          accountType='자유 입출금 통장'
          accountNumber='3521263378183456'
          amount={26305219}
          buttonName='계좌 이체'
          moveTo='/account/transfer/account-info'
        />
        <AccountInfo
          accountType='정기 예금'
          accountNumber='1234567891011121'
          amount={30000000}
          buttonName='중도 해지'
          moveTo='/main'
        />
        <div
          className='mt-[20px] flex h-[128px] w-[320px] flex-col items-center justify-center rounded-xl bg-gray-200 text-center'
          onClick={() => navigate('/account/products')}
        >
          <div className='text-[24px] text-[#5A6A59]'>
            <span>계좌 개설</span>

            <div className='mt-2 flex justify-center'>
              <CiCirclePlus size={44} />
            </div>
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default AccountList;
