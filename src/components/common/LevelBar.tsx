import React from 'react';

type LevelBarProps = {
  currentLevel?: number;
  totalLevel?: number;
};

// LevelBar 사용법 1. currentLevel에 현재 단계, totalLevel에 전체 단계 값을 입력해서 사용하면 됩니다.
const LevelBar: React.FC<LevelBarProps> = ({
  currentLevel = 1,
  totalLevel = 5,
}) => {
  const levels = totalLevel > 0 ? Array.from({ length: totalLevel }) : [];

  return (
    <div className='mb-8 mt-4 text-center'>
      <div className='flex items-center justify-center'>
        {levels.map((_, index) => (
          <div key={index}>
            <div>{index + 1}</div>
            {index + 1 === currentLevel ? (
              <div className='mx-1 flex h-2 w-16 overflow-hidden rounded-full bg-gray-300'>
                <div className='h-full w-1/2 rounded-full bg-[#FFAF2A]' />
                <div className='h-full w-1/2' />
              </div>
            ) : (
              <div
                className={`mx-1 h-2 w-16 rounded-full ${index < currentLevel ? 'bg-[#FFAF2A]' : 'bg-gray-300'}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelBar;
