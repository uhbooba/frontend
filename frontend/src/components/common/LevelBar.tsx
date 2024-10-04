import React from 'react';

type LevelBarProps = {
    currentLevel?: number;
    totalLevel?: number;
};

// LevelBar 사용법 1. currentLevel에 현재 단계, totalLevel에 전체 단계 값을 입력해서 사용하면 됩니다.
const LevelBar: React.FC<LevelBarProps> = ({ currentLevel = 1, totalLevel =  5}) => {
    const levels = totalLevel > 0 ? Array.from({ length: totalLevel }) : [];

    return (
        <div className='text-center'>
            <div className='flex justify-center items-center'>
                {levels.map((_, index) => (
                    <div key={index}>
                        <div>{index+1}</div>
                        {index+1 === currentLevel ? (
                            <div className='w-16 h-2 mx-1 bg-gray-300 rounded-full overflow-hidden flex'>
                                <div className='w-1/2 h-full rounded-full bg-[#FFAF2A]' /> 
                                <div className='w-1/2 h-full' /> 
                            </ div>
                        ) : (
                            <div className={`w-16 h-2 mx-1 rounded-full ${index < currentLevel ? 'bg-[#FFAF2A]' : 'bg-gray-300'}`} />   
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LevelBar;