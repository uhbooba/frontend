import { axiosInstance } from '@/utils/axiosInstance';

// 적금 상품 전체 조회
export const getSavingsProducts = async () => {
  const response = await axiosInstance('/finances/savings/products');
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
