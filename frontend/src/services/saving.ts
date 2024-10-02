import { axiosInstance } from '@/utils/axiosInstance';

// 적금 상품 전체 조회
export const getSavingsProducts = () => {
  const response = axiosInstance.get('/finances/savings/products');
  return response;
};

// 사용자의 적금 계좌 목록 조회
export const getUserSavingsAccounts = (userId: number) => {
  return axiosInstance.get('/finances/savings/accounts', {
    params: { userId },
  });
};

// 적금 만기 이자 조회
export const getExpiryInterest = (userId: number, accountNo: string) => {
  return axiosInstance.get('/finances/savings/accounts/expiry-interests', {
    params: { userId, accountNo },
  });
};

// 적금 중도 해지 시 이자 조회
export const getEarlyTerminationInterest = (
  userId: number,
  accountNo: string,
) => {
  return axiosInstance.get(
    '/finances/savings/accounts/early-termination-interest',
    {
      params: { userId, accountNo },
    },
  );
};
