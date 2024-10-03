import { axiosInstance } from '@/utils/axiosInstance';

// 예금 상품 전체 조회
export const getDepositProducts = () => {
  const response = axiosInstance('/finances/deposits/products');
  return response;
};

// 사용자의 예금 계좌 목록 조회
export const getUserDepositAccounts = (userId: number) => {
  const response = axiosInstance('/finances/deposits/accounts', {
    params: { userId },
  });
  return response;
};

// 예금 만기 이자 조회
export const getDepositExpiryInterests = (
  userId: number,
  accountNo: string,
) => {
  const response = axiosInstance(
    '/finances/deposits/accounts/expiry-interests',
    {
      params: { userId, accountNo },
    },
  );
  return response;
};

// 예금 중도 해지 시 이자 조회
export const getEarlyTerminationInterest = (
  userId: number,
  accountNo: string,
) => {
  const response = axiosInstance(
    '/finances/deposits/accounts/early-termination-interest',
    {
      params: { userId, accountNo },
    },
  );
  return response;
};
