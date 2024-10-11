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
import LevelBar from '@/components/common/LevelBar';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';

const AccountTransferDepositName = () => {
  const navigate = useNavigate();
  const [transactionBalance] = useAtom(transactionBalanceAtom);
  const [selectedBank] = useAtom(selectedBankAtom);
  const [depositAccountNo] = useAtom(depositAccountNoAtom);
  const [withdrawalTransactionSummary, setWithdrawalTransactionSummary] =
    useAtom(withdrawalTransactionSummaryAtom);
  const [depositTransactionSummary, setDepositTransactionSummary] = useAtom(
    depositTransactionSummaryAtom,
  );
  const [depositUsername] = useAtom(depositUsernameAtom);

  return (
    <div>
      <TopBar title='계좌 이체' />
      <MainWrapper>
        <LevelBar currentLevel={3} totalLevel={5} />

        <div className='ml-4 mt-4 text-2xl'>
          <div>
            {selectedBank} {depositAccountNo}
          </div>
          {depositUsername} 님께
        </div>

        <div className='ml-4 mr-4 mt-6'>
          <div className='mb-8 text-3xl'>
            {transactionBalance.toLocaleString()}원을 보냅니다.
          </div>

          <Input
            label='내 통장 기록'
            value={withdrawalTransactionSummary}
            onChange={(e) => setWithdrawalTransactionSummary(e.target.value)}
            className='mb-5'
          />
          <Input
            label='받는 분 통장 기록'
            value={depositTransactionSummary}
            onChange={(e) => setDepositTransactionSummary(e.target.value)}
          />

          <div className='mt-[8vh] w-full'>
            <div className='flex w-full justify-between space-x-4 px-4 pb-4'>
              <Button
                label='이체하기'
                size='large'
                color='orange'
                className='flex-grow'
                onClick={() => navigate('/account/transfer/info-check')}
              />
            </div>
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default AccountTransferDepositName;
