import { axiosInstance } from '@/utils/axiosInstance';

// 입출금 계좌 조회
export const getUserFreeAccount = () => {
  const response = axiosInstance('/finances/demand-deposits/accounts/detail', {
    headers: {
      access:
        // 유효기간 10월 3일 24시까지
        'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MSwidXNlcm5hbWUiOiJ0ZXN0IiwibmFtZSI6IuydtO2VmOyjvSIsImlhdCI6MTcyNzk1NDk2NSwiZXhwIjoxNzI3OTY5MzY1fQ.uCzzlS41Hs57gSLIxeCnHRnqs6nKobzVep-4U6y2VBc',
    },
  });
  return response;
};
