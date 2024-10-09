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
  updatedAt: Date
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // API로부터 거래 내역을 가져오기
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getUserFreeAccountTransactions(accountNo);
        setTransactions(response.data.result.content);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, [accountNo]);

  return (
    <div className='flex flex-col items-center space-y-4 font-bold'>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className='flex w-full justify-between border-b p-4'
          >
            <div>
              <div className='text-[24px]'>
                {transaction.transactionSummary}
              </div>
              {/* 날짜 정보가 필요하다면, 여기에 추가 */}
              <div className='text-[16px] text-[#AEAEB2]'>{new Date(transaction.updatedAt).toLocaleString()}</div>
            </div>
            <div>
              <div
                className={`text-[24px] ${transaction.type == 'DEPOSIT' ? 'text-blue-500' : transaction.type == 'WITHDRAWAL_TRANSFER' ? 'text-red-500' : ''}`}
              >
                {transaction.type == 'DEPOSIT'
                  ? `+${transaction.transactionBalance.toLocaleString()}`
                  : `-${transaction.transactionBalance.toLocaleString()}`}
                원
              </div>
              <div className='text-[18px] text-[#AEAEB2]'>
                {transaction.transactionAfterBalance.toLocaleString()}원
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
