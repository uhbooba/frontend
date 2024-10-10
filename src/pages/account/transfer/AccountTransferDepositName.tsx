import { useAtom } from 'jotai';
import {
  depositAccountNoAtom,
  transactionBalanceAtom,
  withdrawalTransactionSummaryAtom,
  selectedBankAtom,
  depositTransactionSummaryAtom,
  depositUsernameAtom,
} from '@/atoms/account/accountTransferAtoms';
import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import TopBar from '@/components/layouts/TopBar';
// import { useState } from 'react';

const AccountTransferDepositName = () => {
  const navigate = useNavigate();
  const [transactionBalance] = useAtom(transactionBalanceAtom);
  // const [keyOpen, setKeyOpen] = useState(false)
  const [selectedBank] = useAtom(selectedBankAtom);
  const [depositAccountNo] = useAtom(depositAccountNoAtom);
  const [withdrawalTransactionSummary, setWithdrawalTransactionSummary] =
    useAtom(withdrawalTransactionSummaryAtom);
  const [depositTransactionSummary, setDepositTransactionSummary] = useAtom(
    depositTransactionSummaryAtom,
  );
  const [depositUsername] = useAtom(depositUsernameAtom);

  return (
    <div className='flex h-screen flex-col'>
      <div className='w-full'>
        <TopBar title='계좌 이체' showXButton={false} />
      </div>

      <div className='mt-4'>
        <LevelBar currentLevel={3} totalLevel={5} />
      </div>

      <div className='ml-4 mt-4'>
        <div>
          {selectedBank} {depositAccountNo}
        </div>
        {depositUsername}님께
      </div>

      <div className='ml-4 mr-4 mt-6'>
        <div className='mb-8'>{transactionBalance}원</div>

        <Input
          label='내 통장 기록'
          value={withdrawalTransactionSummary}
          onChange={(e) => setWithdrawalTransactionSummary(e.target.value)}
        />
        <Input
          label='받는 분 통장 기록'
          value={depositTransactionSummary}
          onChange={(e) => setDepositTransactionSummary(e.target.value)}
        />

        <div className='mt-[30vh] w-full'>
          <div className='flex w-full justify-between space-x-4 px-4 pb-4'>
            <Button
              label='이체하기'
              size='large'
              color='orange'
              className='flex-grow'
              onClick={() => navigate('/account/transfer/info-check')}
            />
          </div>

          <div className='fixed bottom-0 left-0 w-full'>
            <BottomTab />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTransferDepositName;
