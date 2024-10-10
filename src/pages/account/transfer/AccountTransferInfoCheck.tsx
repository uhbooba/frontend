import TopBar from '@/components/layouts/TopBar';
import LevelBar from '@/components/common/LevelBar';
import MainWrapper from '@/components/layouts/MainWrapper';
import { useAtom } from 'jotai';
import {
  depositAccountNoAtom,
  transactionBalanceAtom,
  selectedBankAtom,
  depositTransactionSummaryAtom,
  withdrawalTransactionSummaryAtom,
} from '@/atoms/account/accountTransferAtoms';
import InfoRow from '@/components/common/InfoRow';
import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';

const AccountTransferInfoCheck = () => {
  const [selectedBank] = useAtom(selectedBankAtom);
  const [depositAccountNo] = useAtom(depositAccountNoAtom);
  const [transactionBalance] = useAtom(transactionBalanceAtom);
  const [withdrawalTransactionSummary] = useAtom(
    withdrawalTransactionSummaryAtom,
  );
  const [depositTransactionSummary] = useAtom(depositTransactionSummaryAtom);
  const navigate = useNavigate();

  const time = new Date();
  const formattedTime = time
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // 24시간 형식
    })
    .replace(/\./g, '. ')
    .trim(); // 날짜 사이 공백 추가

  const infoRows = [
    { title: '받는 계좌', content: `${selectedBank} ${depositAccountNo}` },
    { title: '보낸 금액', content: `${transactionBalance}원` },
    { title: '받는 분 통장 기록', content: depositTransactionSummary },
    { title: '보낸 분 통장 기록', content: withdrawalTransactionSummary },
    { title: '거래 일시', content: formattedTime },
  ];

  return (
    <div>
      <TopBar title='계좌 이체' />
      <MainWrapper>
        <LevelBar currentLevel={4} totalLevel={5} />

        <div className='ml-4 mt-8'>
          <div className='mb-8 text-2xl font-bold'>이체 내역</div>

          {infoRows.map((row, index) => (
            <InfoRow key={index} title={row.title} content={row.content} />
          ))}
        </div>

        <div className='mt-[10vh] w-full'>
          <div className='flex w-full justify-between space-x-4 px-4 pb-4'>
            <Button
              label='확인했어요.'
              size='large'
              color='orange'
              className='flex-grow'
              onClick={() => navigate('/account/transfer/password')}
            />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default AccountTransferInfoCheck;
