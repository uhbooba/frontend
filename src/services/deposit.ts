import { axiosInstance } from '@/utils/axiosInstance';

// 예금 상품 전체 조회
export const getDepositProducts = async () => {
  const response = await axiosInstance('/finances/deposits/products');
  return response;
};

// 사용자의 예금 계좌 목록 조회
export const getUserDepositAccounts = async () => {
  const response = await axiosInstance('/finances/deposits/accounts');
  return response;
};

// 예금 만기 이자 조회
export const getDepositExpiryInterests = async (accountNo: string) => {
  const response = await axiosInstance(
    '/finances/deposits/accounts/expiry-interests',
    {
      params: { accountNo },
    },
  );
  return response;
};

// 예금 중도 해지 시 이자 조회
export const getEarlyTerminationInterest = async (accountNo: string) => {
  const response = await axiosInstance(
    '/finances/deposits/accounts/early-termination-interest',
    {
      params: { accountNo },
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
  );

  return response;
};

// 예금 계좌 삭제
export const deleteDepositAccount = async (accountNo: string) => {
  const response = await axiosInstance.delete('/finances/deposits/accounts', {
    params: { accountNo },
  });
  return response;
};
