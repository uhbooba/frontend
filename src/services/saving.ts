import { axiosInstance } from '@/utils/axiosInstance';

// 적금 상품 전체 조회
export const getSavingsProducts = async () => {
  const response = await axiosInstance('/finances/savings/products', {
    headers: {
      access: `eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MywidXNlcm5hbWUiOiJueWFtIiwibmFtZSI6IuuDoOuDoOydtCIsImlhdCI6MTcyODA0Njg2MiwiZXhwIjoxNzI4MDYxMjYyfQ.DT5-R1Q3e4fFe_oQfEnicjQuvK7d7tcn1qyztcirJto`,
    },
  });
  return response;
};

// 사용자의 적금 계좌 목록 조회
export const getUserSavingsAccounts = async (userId: number) => {
  const response = await axiosInstance('/finances/savings/accounts', {
    params: { userId },
  });
  return response;
};

// 적금 만기 이자 조회
export const getExpiryInterest = async (userId: number, accountNo: string) => {
  const response = await axiosInstance(
    '/finances/savings/accounts/expiry-interests',
    {
      params: { userId, accountNo },
    },
  );
  return response;
};

// 적금 중도 해지 시 이자 조회
export const getEarlyTerminationInterest = async (
  userId: number,
  accountNo: string,
) => {
  const response = await axiosInstance(
    '/finances/savings/accounts/early-termination-interest',
    {
      params: { userId, accountNo },
    },
  );
  return response;
};

// 적금 계좌 생성
export const createSavingsAccount = async (
  withdrawalAccountNo: string,
  accountTypeUniqueNo: string,
  savingsBalance: number,
) => {
  const bodyData = {
    withdrawalAccountNo,
    accountTypeUniqueNo,
    depositBalance: savingsBalance,
    // 스웨거에 디포짓밸런스로되어있어서 이렇게 일단 함, 인엽형이 수정해주면 다시 세이빙밸런스 보내는거로 변경하기
  };

  const response = await axiosInstance.post(
    '/finances/savings/accounts',
    bodyData,
    {
      headers: {
        access: `eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MywidXNlcm5hbWUiOiJueWFtIiwibmFtZSI6IuuDoOuDoOydtCIsImlhdCI6MTcyODA0Njg2MiwiZXhwIjoxNzI4MDYxMjYyfQ.DT5-R1Q3e4fFe_oQfEnicjQuvK7d7tcn1qyztcirJto`,
      },
    },
  );

  return response;
};
