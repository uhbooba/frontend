import TopBar from '@/components/layouts/TopBar';
import AccountInfo from '@/components/common/AccountInfo';
import { useEffect, useState } from 'react';
import { getUserSavingsAccounts } from '@/services/saving';
import { getUserDepositAccounts } from '@/services/deposit';
import { getMissionClearStatus } from '@/services/mission';
import { useNavigate } from 'react-router';
import { useSetAtom } from 'jotai';
import { selectedAccountAtom } from '@/atoms/deposit/depositDataAtoms';
import { selectedSavingsAccountAtom } from '@/atoms/savings/savingsDataAtoms';
import MainWrapper from '@/components/layouts/MainWrapper';

const AccountDepositList = () => {
  const [depositAccounts, setDepositAccounts] = useState<any[]>([]);
  const [savingsAccounts, setSavingsAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const setSelectedAccount = useSetAtom(selectedAccountAtom);
  const setSelectedSavingsAccount = useSetAtom(selectedSavingsAccountAtom);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const depositResponse = await getUserDepositAccounts();
        const savingsResponse = await getUserSavingsAccounts();

        setDepositAccounts(depositResponse?.data?.result || []);
        setSavingsAccounts(savingsResponse?.data?.result || []);
      } catch (error) {
        console.error('예적금 계좌정보 불러오는 api 에러', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleCancelClick = async (accountType: string, account: any) => {
    try {
      const response = await getMissionClearStatus(5); // 5단계 미션 클리어 했는지확인
      const missionCleared = response?.result === true;

      if (accountType === '예금 계좌') {
        setSelectedAccount(account); // 예금 계좌 정보 저장
        if (missionCleared) {
          navigate('/cancel/deposit/explain'); // 미션 성공한 기록 있으면 설명페이지로
        } else {
          navigate('/cancel/deposit/mission'); // 미션 성공한 기록 없으면 미션 페이지로
        }
      } else if (accountType === '적금 계좌') {
        setSelectedSavingsAccount(account); // 적금 계좌 정보 저장
        navigate('/cancel/savings/explain'); // 적금은 미션없으니 바로 설명 페이지로
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <TopBar title='계좌 목록' showXButton={false} />
      <MainWrapper>
        <div className='flex flex-col items-center justify-center'>
          {loading ? (
            <p>로딩 중...</p>
          ) : depositAccounts.length === 0 && savingsAccounts.length === 0 ? (
            <div className='text-center text-xl font-bold'>
              가입한 예금 & 적금이 없습니다.
            </div>
          ) : (
            <>
              {depositAccounts.map((account, index) => (
                <AccountInfo
                  key={`deposit-${index}`}
                  accountType='예금 계좌'
                  accountNumber={account.accountNo}
                  amount={parseInt(account.depositBalance, 10)}
                  buttonName='중도 해지'
                  moveTo=''
                  onClick={() => {
                    handleCancelClick('예금 계좌', account);
                  }}
                />
              ))}
              {savingsAccounts.map((account, index) => (
                <AccountInfo
                  key={`savings-${index}`}
                  accountType='적금 계좌'
                  accountNumber={account.accountNo}
                  amount={parseInt(account.depositBalance, 10)}
                  buttonName='중도 해지'
                  moveTo=''
                  onClick={() => {
                    setSelectedSavingsAccount(account); // 적금 계좌 정보 저장
                    navigate('/cancel/savings/explain');
                  }}
                />
              ))}
            </>
          )}
        </div>
      </MainWrapper>
    </div>
  );
};

export default AccountDepositList;
