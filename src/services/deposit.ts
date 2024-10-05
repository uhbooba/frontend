import { axiosInstance } from '@/utils/axiosInstance';

// 예금 상품 전체 조회
export const getDepositProducts = async () => {
  const response = await axiosInstance('/finances/deposits/products', {
    headers: {
      access: `eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6NSwidXNlcm5hbWUiOiJiZWFuIiwibmFtZSI6Iuy1nOyYgeu5iCIsImlhdCI6MTcyODEzNDc1NiwiZXhwIjoxNzI4MTQ5MTU2fQ.V-BQpJkp-I1B-hZaqdh5vrwI2ZRH1YS4vN_KMoL0Fjg`,
    },
  });
  return response;
};

// 사용자의 예금 계좌 목록 조회
export const getUserDepositAccounts = async (userId: number) => {
  const response = await axiosInstance('/finances/deposits/accounts', {
    params: { userId },
  });
  return response;
};

// 예금 만기 이자 조회
export const getDepositExpiryInterests = async (
  userId: number,
  accountNo: string,
) => {
  const response = await axiosInstance(
    '/finances/deposits/accounts/expiry-interests',
    {
      params: { userId, accountNo },
    },
  );
  return response;
};

// 예금 중도 해지 시 이자 조회
export const getEarlyTerminationInterest = async (
  userId: number,
  accountNo: string,
) => {
  const response = await axiosInstance(
    '/finances/deposits/accounts/early-termination-interest',
    {
      params: { userId, accountNo },
    },
  );
  return response;
};

// 예금 계좌 생성
export const createDepositAccount = async (
  withdrawalAccountNo: string,
  accountTypeUniqueNo: string,
  depositBalance: number,
) => {
  const bodyData = {
    withdrawalAccountNo,
    accountTypeUniqueNo,
    depositBalance,
  };

  const response = await axiosInstance.post(
    '/finances/deposits/accounts',
    bodyData,
    {
      headers: {
        access: `eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6NSwidXNlcm5hbWUiOiJiZWFuIiwibmFtZSI6Iuy1nOyYgeu5iCIsImlhdCI6MTcyODEzNDc1NiwiZXhwIjoxNzI4MTQ5MTU2fQ.V-BQpJkp-I1B-hZaqdh5vrwI2ZRH1YS4vN_KMoL0Fjg`,
      },
    },
  );

  return response;
};
