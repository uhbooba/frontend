import React from 'react';

type BackButtonProps = {
  onClick?: () => void;
  className?: string;
};

const BackButton: React.FC<BackButtonProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        xmlns='http://www.w3.org/2000.svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke='black'
        className='h-7 w-7 hover:h-10 hover:w-10'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15 19l-7-7 7-7'
        />
      </svg>
    </button>
  );
};

export default BackButton;
