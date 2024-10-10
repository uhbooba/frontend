import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';
import AccountInfo from '@/components/common/AccountInfo';
import { CiCirclePlus } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUserFreeAccount } from '@/services/account';
import { getUserDepositAccounts } from '@/services/deposit';
import { getUserSavingsAccounts } from '@/services/saving';
import { getMissionClearStatus } from '@/services/mission';

interface AccountData {
  accountName: string;
  accountNo: string;
  balance: string;
  depositBalance: string;
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

  const handleTransferClick = async (accountNo: string) => {
    try {
      const missionStatus = await getMissionClearStatus(3); // 미션 ID 3에 대한 상태 확인
      if (!missionStatus?.result) {
        navigate('/account/transfer/mission'); // 미션이 완료되지 않았으면 미션 페이지로 이동
        return;
      }
      // 미션이 완료되었다면, 이체 페이지로 이동
      navigate('/account/transfer/account-info', { state: { accountNo } });
    } catch (error) {
      console.error('미션 상태 확인 중 오류 발생:', error);
    }
  };

  return (
    <div className=''>
      <TopBar title='계좌 목록' showXButton={false} />
      <MainWrapper>
        <div className='flex flex-col items-center justify-center'>
          {/* 자유 입출금 계좌 정보 */}
          {accountData.freeAccounts.map((account, index) => (
            <AccountInfo
              key={`free-${index}`}
              accountType={account.accountName}
              accountNumber={account.accountNo}
              amount={Number(account.balance)}
              buttonName='계좌 이체'
              moveTo='/account/transfer/account-info'
              onClick={() => handleTransferClick(account.accountNo)}
            />
          ))}

          {/* 정기 예금 계좌 정보 */}
          {accountData.depositAccounts.map((account, index) => (
            <AccountInfo
              key={`deposit-${index}`}
              accountType={account.accountName}
              accountNumber={account.accountNo}
              amount={Number(account.depositBalance)}
              buttonName='중도 해지'
              moveTo='/main'
            />
          ))}

          {/* 정기 적금 계좌 정보 */}
          {accountData.savingsAccounts.map((account, index) => (
            <AccountInfo
              key={`savings-${index}`}
              accountType={account.accountName}
              accountNumber={account.accountNo}
              amount={Number(account.depositBalance)}
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
      </MainWrapper>
    </div>
  );
};

export default AccountList;
