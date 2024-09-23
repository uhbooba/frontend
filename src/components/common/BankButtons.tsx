import React from 'react';
import Button from './buttons/Button';
import clsx from 'clsx';

type BankButtonsProps = {
  banks: string[];
  onBankClick: (amount: string) => void;
  bankBtnColor: string;
};

const BankButtons: React.FC<BankButtonsProps> = ({
  banks,
  onBankClick,
  bankBtnColor,
}) => {
  return (
    <div>
      <div className='flex justify-between space-x-4 px-4'>
        {banks.slice(0, 3).map((bank, index) => (
          <Button
            key={index}
            label={bank}
            color='orange'
            size='small'
            onClick={() => onBankClick(bank)}
            className={clsx(
              'mt-2 border-2',
              bankBtnColor === bank ? 'font-bold opacity-100' : 'opacity-50',
            )}
          />
        ))}
      </div>

      <div className='flex justify-between space-x-4 px-4 py-4'>
        {banks.slice(3, 6).map((bank, index) => (
          <Button
            key={index}
            label={bank}
            color='orange'
            size='small'
            onClick={() => onBankClick(bank)}
            className={clsx(
              'border-2',
              bankBtnColor === bank ? 'font-bold opacity-100' : 'opacity-50',
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default BankButtons;
