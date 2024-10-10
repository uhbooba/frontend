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
  const [groupedTransactions, setGroupedTransactions] =
    useState<GroupedTransactions>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(new Date(date));
  };

  const formatDate = (date: Date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    return { year, monthAndDay: `${month}월 ${day}일` };
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getUserFreeAccountTransactions(accountNo);
        const fetchedTransactions = response.data.result.content;

        if (!fetchedTransactions || fetchedTransactions.length === 0) {
          setError('거래 내역이 없습니다.');
          setLoading(false);
          return;
        }

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
        console.log(error);
        setError('거래 내역을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [accountNo]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='mt-4 flex flex-col items-center space-y-4 font-bold'>
      {Object.keys(groupedTransactions).length > 0 ? (
        Object.entries(groupedTransactions).map(([year, monthsAndDays]) => (
          <div key={year}>
            <div className='mb-2 text-[30px] font-semibold'>{year}년</div>
            {Object.entries(monthsAndDays).map(
              ([monthAndDay, transactions]) => (
                <div key={monthAndDay} className='mt-4 w-full'>
                  <div className='mb-2 border-b border-gray-600 text-[26px] font-semibold'>
                    {monthAndDay}
                  </div>
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className='flex w-full justify-between border-b py-4'
                    >
                      <div>
                        <div className='text-[24px]'>
                          {transaction.transactionSummary}
                        </div>
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
