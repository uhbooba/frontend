import { axiosInstance } from '@/utils/axiosInstance';

// 입출금 계좌 조회
export const getUserFreeAccount = async () => {
  const response = await axiosInstance(
    '/finances/demand-deposits/accounts/detail',
    {
      headers: {
        access:
          // 유효기간
          'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MywidXNlcm5hbWUiOiJueWFtIiwibmFtZSI6IuuDoOuDoOydtCIsImlhdCI6MTcyODA0Njg2MiwiZXhwIjoxNzI4MDYxMjYyfQ.DT5-R1Q3e4fFe_oQfEnicjQuvK7d7tcn1qyztcirJto',
      },
    },
  );
  return response;
};

// 입출금 계좌 거래 내역 조회
export const getUserFreeAccountTransactions = () => {
  const response = axiosInstance('/finances/transactions');
  return response;
};
