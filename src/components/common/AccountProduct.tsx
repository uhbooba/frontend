import React from 'react';

type AccountProductProps = {
  name: string;
  description: string;
  moveTo: string;
  onClick: () => void;
};

const AccountProduct: React.FC<AccountProductProps> = ({
  name,
  description,
  onClick,
}) => {
  return (
    <div
      className='mt-[20px] h-[128px] w-[320px] rounded-xl bg-[#FFAF2A] text-center'
      onClick={onClick}
    >
      <div className='mb-[5px] mt-6 font-bold'>
        <div className='text-[24px] text-[#5A6A59]'>{name}</div>
        <div className='mt-6 text-[18px]'>{description}</div>
      </div>
    </div>
  );
};

export default AccountProduct;
