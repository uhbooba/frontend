import { axiosInstance } from '@/utils/axiosInstance';

// 입출금 계좌 조회
export const getUserFreeAccount = (userId: number) => {
  const response = axiosInstance.get(
    '/finances/demand-deposits/accounts/detail',
    {
      params: { userId },
    },
  );
  return response;
};
