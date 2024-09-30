import React from 'react';

type DottedCircleProps = {
  isCompleted: boolean;
  onClick: () => void;
};

const DottedCircle: React.FC<DottedCircleProps> = ({
  isCompleted,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className='flex h-16 w-16 items-center justify-center'
    >
      {isCompleted ? (
        <img src='/assets/images/stamp.png' alt='Stamp' className='h-16 w-16' />
      ) : (
        <div className='h-16 w-16 rounded-full border-2 border-dotted border-gray-400' />
      )}
    </div>
  );
};

export default DottedCircle;
