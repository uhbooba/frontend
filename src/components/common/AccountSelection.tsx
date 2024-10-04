import clsx from 'clsx';

interface AccountSelectionProps {
  accountNo: string;
  selectedAccount: string;
  onAccountClick: (accountId: string) => void;
  accountName: string;
  balance: string;
}

const AccountSelection = ({
  accountNo,
  selectedAccount,
  onAccountClick,
  accountName,
  balance,
}: AccountSelectionProps) => {
  return (
    <div
      onClick={() => onAccountClick(accountNo)}
      className={clsx(
        'm-4 cursor-pointer rounded-lg border-2 p-4',
        selectedAccount === accountNo
          ? 'border-blue-400 text-blue-400'
          : 'border-gray-200',
      )}
    >
      <div className='text-base font-bold'>{accountName}</div>
      <div className='text-sm text-gray-500'>{accountNo}</div>
      <div className='mt-2 text-right'>
        <span className='mr-6 text-gray-400'>출금가능금액</span>
        <span className='font-bold text-black'>{balance}</span>
      </div>
    </div>
  );
};

export default AccountSelection;
