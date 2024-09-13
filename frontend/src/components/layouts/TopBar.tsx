import React from 'react';
import BackButton from '@/components/common/buttons/BackButton';

type TopBarProps = {
  title: string;
};

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <div className='flex items-center justify-between border-b-4 bg-white py-4'>
      <BackButton className='ml-4' />
      <span className='absolute left-1/2 -translate-x-1/2 transform text-xl font-bold'>
        {title}
      </span>
    </div>
  );
};

export default TopBar;
