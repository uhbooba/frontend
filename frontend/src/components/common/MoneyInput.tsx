import React from 'react';
import Button from './buttons/Button';
import clsx from 'clsx';

type MoneyInputProps = {
  amounts: string[];
  onAmountClick: (index: number, amount: string) => void;
  amountBtnColor: string;
};

const MoneyInput: React.FC<MoneyInputProps> = ({
  amounts,
  onAmountClick,
  amountBtnColor,
}) => {
  return (
    <div>
      <div className='flex justify-between space-x-4 px-4'>
        {amounts.slice(0, 3).map((amount, index) => (
          <Button
            key={index}
            label={amount}
            color='white'
            size='small'
            onClick={() => onAmountClick(index, amount)}
            className={clsx(
              'border-2',
              amountBtnColor === amount
                ? 'border-blue-400 text-blue-400'
                : 'border-gray-200',
            )}
          />
        ))}
      </div>

      <div className='flex justify-between space-x-4 px-4 py-4'>
        {amounts.slice(3, 6).map((amount, index) => (
          <Button
            key={index+3}
            label={amount}
            color='white'
            size='small'
            onClick={() => onAmountClick(index+3, amount)}
            className={clsx(
              'border-2',
              amountBtnColor === amount
                ? 'border-blue-400 text-blue-400'
                : 'border-gray-200',
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default MoneyInput;
