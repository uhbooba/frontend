import React, { useEffect, useState } from 'react';
import { getUserFreeAccountTransactions } from '@/services/account'; // API 함수 가져오기

type Transaction = {
  id: number;
  transactionUniqueNo: string;
  status: string;
  type: string;
  transactionBalance: number;
  transactionAfterBalance: number;
  transactionSummary: string;
  updatedAt: Date;
};

type GroupedTransactions = {
  [year: string]: {
    [monthAndDay: string]: Transaction[];
  };
};

type AccountHistoryProps = {
  accountNo: string;
  filter: {
    date: string;
    type: string;
    sort: string;
    startDate?: string;
    endDate?: string;
  };
};

const AccountHistory: React.FC<AccountHistoryProps> = ({ accountNo }) => {
  // 날짜별로 그룹화된 거래 내역을 담기 위한 변수
  const [groupedTransactions, setGroupedTransactions] = useState<{
    [year: string]: {
      [monthAndDay: string]: Transaction[];
    };
  }>({});

  // 날짜 포맷 함수: "오전/오후 시:분"
  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(new Date(date));
  };

  // 날짜 포맷 함수: "년. 월. 일"
  const formatDate = (date: Date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    return { year, monthAndDay: `${month}월 ${day}일` };
  };

  // 거래 내역을 API로부터 가져오기
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getUserFreeAccountTransactions(accountNo);
        const fetchedTransactions = response.data.result.content;

        // 거래 내역을 년, 월, 일 기준으로 그룹화
        const grouped = fetchedTransactions.reduce(
          (acc: GroupedTransactions, transaction: Transaction) => {
            const { year, monthAndDay } = formatDate(transaction.updatedAt);

            if (!acc[year]) {
              acc[year] = {};
            }
            if (!acc[year][monthAndDay]) {
              acc[year][monthAndDay] = [];
            }
            acc[year][monthAndDay].push(transaction);

            return acc;
          },
          {},
        );

        setGroupedTransactions(grouped);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, [accountNo]);

  return (
    <div className='mt-4 flex flex-col items-center space-y-4 font-bold'>
      {Object.keys(groupedTransactions).length > 0 ? (
        Object.entries(groupedTransactions).map(([year, monthsAndDays]) => (
          <div key={year}>
            {/* 년도 표시 */}
            <div className='mb-2 text-[24px] font-semibold text-gray-500'>
              {year}년
            </div>
            {Object.entries(monthsAndDays).map(
              ([monthAndDay, transactions]) => (
                <div key={monthAndDay} className='w-full'>
                  {/* 월/일 표시 */}
                  <div className='mb-2 text-[20px] font-medium text-gray-700'>
                    {monthAndDay}
                  </div>
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className='flex w-full justify-between border-b p-4'
                    >
                      <div>
                        <div className='text-[24px]'>
                          {transaction.transactionSummary}
                        </div>
                        {/* 시간 표시 */}
                        <div className='text-[16px] text-[#AEAEB2]'>
                          {formatTime(transaction.updatedAt)}
                        </div>
                      </div>
                      <div className='ml-6'>
                        <div
                          className={`text-[24px] ${
                            transaction.type == 'DEPOSIT'
                              ? 'text-blue-500'
                              : transaction.type == 'WITHDRAWAL_TRANSFER'
                                ? 'text-red-500'
                                : ''
                          }`}
                        >
                          {transaction.type == 'DEPOSIT'
                            ? `+${transaction.transactionBalance.toLocaleString()}`
                            : `-${transaction.transactionBalance.toLocaleString()}`}
                          원
                        </div>
                        <div className='text-right text-[18px] text-[#AEAEB2]'>
                          {transaction.transactionAfterBalance.toLocaleString()}
                          원
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            )}
          </div>
        ))
      ) : (
        <div>거래 내역이 없습니다.</div>
      )}
    </div>
  );
};

export default AccountHistory;
