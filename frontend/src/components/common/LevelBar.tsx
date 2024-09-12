import React from 'react';

type LevelBarProps = {
    currentLevel?: number;
    totalLevel?: number;
};

const LevelBar: React.FC<LevelBarProps> = ({ currentLevel = 1, totalLevel =  5}) => {
    const levels = totalLevel > 0 ? Array.from({ length: totalLevel }) : [];

    return (
        <div className='text-center'>
            <div className='flex justify-center items-center'>
                {levels.map((_, index) => (
                    <div
                        key={index}
                        className={`w-16 h-2 mx-1 rounded-full ${index < currentLevel ? 'bg-[#FFA2FA]' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
            <div className='mt-2 text-gray-600'>
                Level {currentLevel} of {totalLevel}
            </div>
        </div>
    );
};

export default LevelBar;