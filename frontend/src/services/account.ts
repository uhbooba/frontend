import { axiosInstance } from '@/utils/axiosInstance';

// 입출금 계좌 조회
export const getUserFreeAccount = async () => {
  const response = await axiosInstance(
    '/finances/demand-deposits/accounts/detail',
  );
  return response;
};

// 입출금 계좌 거래 내역 조회
export const getUserFreeAccountTransactions = () => {
  const response = axiosInstance('/finances/transactions');
  return response;
};

// 입출금 계좌 입금
export const postUserFreeAccountAddCash = async (
  accountNo: string,
  transactionBalance: number,
  transactionSummary: string,
) => {
  const response = await axiosInstance.post(
    '/finances/demand-deposits/accounts/deposit',
    {
      accountNo,
      transactionBalance,
      transactionSummary,
    },
  );
  return response;
};
