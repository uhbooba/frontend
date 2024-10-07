import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import AccountInfo from '@/components/common/AccountInfo';
import { CiCirclePlus } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUserFreeAccount } from '@/services/account';
import { getUserDepositAccounts } from '@/services/deposit';
import { getUserSavingsAccounts } from '@/services/saving';

interface AccountData {
  accountName: string;
  accountNo: string;
  balance: string;
}

const AccountList = () => {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState<{
    freeAccounts: AccountData[];
    depositAccounts: AccountData[];
    savingsAccounts: AccountData[];
  }>({
    freeAccounts: [],
    depositAccounts: [],
    savingsAccounts: [],
  });

  useEffect(() => {
    const fetchAccountList = async () => {
      try {
        const freeAccountResponse = await getUserFreeAccount();
        const freeAccounts = Array.isArray(freeAccountResponse?.data?.result)
          ? freeAccountResponse.data.result
          : [freeAccountResponse?.data?.result];

        // 정기 예금 계좌 요청
        const depositAccountResponse = await getUserDepositAccounts();
        const depositAccounts = Array.isArray(
          depositAccountResponse?.data?.result,
        )
          ? depositAccountResponse.data.result
          : [depositAccountResponse?.data?.result];

        // 정기 적금 계좌 요청
        const savingsAccountResponse = await getUserSavingsAccounts();
        const savingsAccounts = Array.isArray(
          savingsAccountResponse?.data?.result,
        )
          ? savingsAccountResponse.data.result
          : [savingsAccountResponse?.data?.result];

        setAccountData({
          freeAccounts,
          depositAccounts,
          savingsAccounts,
        });
      } catch (error) {
        console.error('계좌 정보 API 호출 중 오류 발생:', error);
      }
    };

    fetchAccountList();
  }, []);

  return (
    <div className=''>
      <TopBar title='계좌 목록' showXButton={false} />
      <div className='flex flex-col items-center justify-center'>
        {/* 자유 입출금 계좌 정보 */}
        {accountData.freeAccounts.map((account, index) => (
          <AccountInfo
            key={`free-${index}`}
            accountType={account.accountName}
            acconutNumber={account.accountNo}
            amount={Number(account.balance)}
            buttonName='계좌 이체'
            moveTo='/account/transfer/account-info'
          />
        ))}

        {/* 정기 예금 계좌 정보 */}
        {accountData.depositAccounts.map((account, index) => (
          <AccountInfo
            key={`deposit-${index}`}
            accountType={account.accountName}
            acconutNumber={account.accountNo}
            amount={Number(account.balance)}
            buttonName='중도 해지'
            moveTo='/main'
          />
        ))}

        {/* 정기 적금 계좌 정보 */}
        {accountData.savingsAccounts.map((account, index) => (
          <AccountInfo
            key={`savings-${index}`}
            accountType={account.accountName}
            acconutNumber={account.accountNo}
            amount={Number(account.balance)}
            buttonName='중도 해지'
            moveTo='/main'
          />
        ))}
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
