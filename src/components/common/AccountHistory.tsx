import React, { useEffect, useState } from 'react';
import { getUserFreeAccountTransactions } from '@/services/account'; // API 함수 가져오기

type Transaction = {
  id: number;
  name: string;
  time: string; // API에서 시간의 형식이 문자열일 경우 string으로 변경
  amount: number;
  balance: number;
  type: string; // 거래 유형 추가
};

type AccountHistoryProps = {
  filter: {
    date: string; // 필터 조건
    type: string;
    sort: string;
    startDate?: string; // 시작일
    endDate?: string; // 종료일
  };
};

// 시간 형식 변환 함수
const formatTime = (date: string) => {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const isAM = hours < 12;
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // 12시간 형식으로 변환
  const period = isAM ? '오전' : '오후';
  return `${period} ${formattedHours}시 ${minutes}분`;
};

const AccountHistory: React.FC<AccountHistoryProps> = ({ filter }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  // API로부터 거래 내역을 가져오기
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getUserFreeAccountTransactions();
        setTransactions(response.data.content);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // 거래 내역 필터링
  useEffect(() => {
    const applyFilter = () => {
      const now = new Date();
      let filtered = transactions;

      // 날짜 필터링
      if (filter.date === '1주일') {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        filtered = filtered.filter(
          (transaction) => new Date(transaction.time) >= weekAgo,
        );
      } else if (filter.date === '1개월') {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        filtered = filtered.filter(
          (transaction) => new Date(transaction.time) >= monthAgo,
        );
      } else if (filter.date === '전체 기간') {
        // 전체 기간은 필터링하지 않음
      } else if (filter.date === '직접 설정') {
        const startDate = new Date(filter.startDate!); // '!'는 필수 속성이므로 null이 아님을 보장
        const endDate = new Date(filter.endDate!); // '!'는 필수 속성이므로 null이 아님을 보장
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.time);
          return transactionDate >= startDate && transactionDate <= endDate;
        });
      }

      // 유형 필터링
      if (filter.type !== '전체') {
        filtered = filtered.filter(
          (transaction) => transaction.type === filter.type,
        );
      }

      // 정렬
      if (filter.sort === '최신순') {
        filtered.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
        );
      } else if (filter.sort === '오래된순') {
        filtered.sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
        );
      }

      setFilteredTransactions(filtered);
    };

    applyFilter();
  }, [transactions, filter]); // transactions와 filter가 변경될 때마다 필터 적용

  return (
    <div>
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className='flex justify-evenly space-x-10 font-bold'
          >
            <div>
              <div className='text-[24px]'>{transaction.name}</div>
              <div className='text-[16px] text-[#AEAEB2]'>
                {formatTime(transaction.time)}
              </div>
            </div>
            <div>
              <div
                className={`text-[24px] ${transaction.amount > 0 ? 'text-blue-500' : 'text-red-500'}`}
              >
                {transaction.amount > 0
                  ? `+${transaction.amount}`
                  : transaction.amount}
                원
              </div>
              <div className='text-[18px] text-[#AEAEB2]'>
                {transaction.balance.toLocaleString()}원
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>거래 내역이 없습니다.</div>
      )}
    </div>
  );
};

export default AccountHistory;
