import React from 'react';

type AccountHistoryProps = {
    name?: string;
    time?: Date;
    amount?: number;
    balance?: number;
};


// LevelBar 사용법 1. currentLevel에 현재 단계, totalLevel에 전체 단계 값을 입력해서 사용하면 됩니다.
const AccountHistory: React.FC<AccountHistoryProps> = ({ name='이찬규', time=new Date(), amount=3000, balance=26305219  }) => {
    // 코드 가져옴
    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        const isAM = hours < 12;
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // 12시간 형식으로 변환
        const period = isAM ? "오전" : "오후";
    
        return `${period} ${formattedHours}시 ${minutes}분`;
    };

    return (
        <div className='flex justify-evenly space-x-10 font-bold'>            
            <div>
                <div className='text-[24px]'>{ name }</div>
                <div className='text-[16px] text-[#AEAEB2]'>{ formatTime(time)}</div>
            </div>
            <div>
                <div className={`text-[24px] ${amount > 0 ? 'text-blue-500' : amount < 0 ? 'text-red-500' : ''}`}>
                    {amount > 0 ? `+${amount}` : amount }원
                </div>
                <div className='text-[18px] text-[#AEAEB2]'>{ balance.toLocaleString() }원</div>
            </div>
        </div>
        
    );
};

export default AccountHistory;