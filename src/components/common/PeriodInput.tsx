import React from 'react';
import Button from './buttons/Button';
import clsx from 'clsx';


type PeriodInputProps = {
  periods: string[];
  onPeriodClick: (period:string) => void;
  periodBtnColor: string;
};

const PeriodInput: React.FC<PeriodInputProps> = ({ periods, onPeriodClick, periodBtnColor }) => {
  return (
    <div>
      

      <div className='flex justify-between space-x-4 px-4'>
        {periods.slice(0, 2).map((period, index) => (
          <Button
            key={index}
            label={period}
            color='white'
            size='small'
            onClick={() => {
              onPeriodClick(period);
            }}
            className={clsx(
              'border-2',
              periodBtnColor === period 
                ? 'border-blue-400 text-blue-400' 
                : 'border-gray-200'
            )}
          />
        ))}
      </div>

      <div className='flex justify-between space-x-4 px-4 py-4'>
        {periods.slice(2, 4).map((period, index) => (
          <Button
            key={index}
            label={period}
            color='white'
            size='small'
            onClick={() => {
              onPeriodClick(period);
            }}
            className={clsx(
              'border-2',
              periodBtnColor === period 
                ? 'border-blue-400 text-blue-400' 
                : 'border-gray-200'
            )}
          />
        ))}
      </div>

      
    </div>
  );
};

export default PeriodInput;
