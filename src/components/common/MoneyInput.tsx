import React from 'react';
import Button from './buttons/Button';
import { Input } from './Input';

type MoneyInputProps = {
  amounts: string[];
};

const MoneyInput: React.FC<MoneyInputProps> = ({ amounts }) => {
  return (
    <div>
      <div className='pb-4 pl-4 text-3xl font-bold'>
        <span>얼마로 시작할까요?</span>
      </div>

      <div className='flex justify-between space-x-4 px-4'>
        {amounts.slice(0, 3).map((amount, index) => (
          <Button
            key={index}
            label={amount}
            color='white'
            size='small'
            className='rounded border-2 border-gray-200'
          />
        ))}
      </div>

      <div className='flex justify-between space-x-4 px-4 py-4'>
        {amounts.slice(3, 6).map((amount, index) => (
          <Button
            key={index}
            label={amount}
            color='white'
            size='small'
            className='rounded border-2 border-gray-200'
          />
        ))}
      </div>

      <div className='px-4'>
        <Input
          placeholder='금액을 입력하세요.'
          className='rounded border-2 pl-4'
        />
      </div>
    </div>
  );
};

export default MoneyInput;
