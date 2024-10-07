import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import { postUserFreeAccountTransfer } from '@/services/account';
import { useAtom } from 'jotai';
import {
  transactionBalanceAtom,
  depositAccountNoAtom,
  depositTransactionSummaryAtom,
  withdrawalAccountNoAtom,
  withdrawalTransactionSummaryAtom,
} from '@/atoms/account/accountTransferAtoms';

const AccountTransferPassword = () => {
  const navigate = useNavigate();
  const [depositAccountNo] = useAtom(depositAccountNoAtom);
  const [depositTransactionSummary] = useAtom(depositTransactionSummaryAtom);
  const [transactionBalance] = useAtom(transactionBalanceAtom);
  const [withdrawalAccountNo] = useAtom(withdrawalAccountNoAtom);
  const [withdrawalTransactionSummary] = useAtom(
    withdrawalTransactionSummaryAtom,
  );

  const passwordComplete = (password: string[]) => {
    console.log('비밀번호 확인용 :', password.join(''));
    const transfer = () => {
      try {
        postUserFreeAccountTransfer(
          // 이체받을 계좌번호
          depositAccountNo,
          // 이체받을 계좌기록
          depositTransactionSummary,
          // 이체 금액
          transactionBalance,
          // 출금할 계좌 번호
          withdrawalAccountNo,
          // 출금할 계좌 기록
          withdrawalTransactionSummary,
        );
      } catch (error) {
        console.error('Error fetching answer:', error);
      }
    };
    transfer();
    navigate('/account/transfer/success');
  };

  return (
    <div>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='계좌 이체' showXButton={false} />
      </div>

      <div className='mb-2 mt-20'>
        <LevelBar currentLevel={5} totalLevel={5} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default AccountTransferPassword;
