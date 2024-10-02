import React from 'react';

type DottedCircleProps = {
  isCompleted: boolean;
  missionName: string;
};

const DottedCircle: React.FC<DottedCircleProps> = ({
  isCompleted,
  missionName,
}) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex h-16 w-16 items-center justify-center'>
        {isCompleted ? (
          <img src='/assets/images/stamp.png' alt='Stamp' className='h-16 w-16' />
        ) : (
          <div className='h-16 w-16 rounded-full border-2 border-dotted border-gray-400' />
        )}
      </div>
      <div className='mt-2 text-sm text-gray-600 text-center'>
        {missionName.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
};

export default DottedCircle;
