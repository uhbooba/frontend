import { axiosInstance } from '@/utils/axiosInstance';

// 입출금 계좌 조회
export const getUserFreeAccount = () => {
  const response = axiosInstance.get(
    '/finances/demand-deposits/accounts/detail',
  );
  return response;
};
