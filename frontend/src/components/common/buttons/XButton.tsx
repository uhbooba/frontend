import React from 'react';
import clsx from 'clsx';

type XButtonProps = {
  onClick?: () => void;
  className?: string;
};

const XButton: React.FC<XButtonProps> = ({ onClick, className }) => {
  return (
    <button className={clsx(className)} onClick={onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke='black'
        className='h-7 w-7 hover:h-10 hover:w-10'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    </button>
  );
};

export default XButton;
