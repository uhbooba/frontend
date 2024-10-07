import { axiosInstance } from '@/utils/axiosInstance';

// 적금 상품 전체 조회
export const getSavingsProducts = async () => {
  const response = await axiosInstance('/finances/savings/products');
  return response;
};

// 사용자의 적금 계좌 목록 조회
export const getUserSavingsAccounts = async () => {
  const response = await axiosInstance('/finances/savings/accounts');
  return response;
};

// 적금 만기 이자 조회
export const getExpiryInterest = async (accountNo: string) => {
  const response = await axiosInstance(
    '/finances/savings/accounts/expiry-interests',
    {
      params: { accountNo },
    },
  );
  return response;
};

// 적금 중도 해지 시 이자 조회
export const getEarlyTerminationInterest = async (accountNo: string) => {
  const response = await axiosInstance(
    '/finances/savings/accounts/early-termination-interest',
    {
      params: { accountNo },
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
  );

  return response;
};

// 적금 계좌 삭제
export const deleteSavingsAccount = async (accountNo: string) => {
  const response = await axiosInstance.delete('/finances/savings/accounts', {
    params: { accountNo },
  });
  return response;
};
