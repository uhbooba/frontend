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
  // password: string,
  // 10월 7일 오후 4시, 인엽이형이 필드명 password, string 형식으로 사용자가 입력한 비밀번호도 예적금 가입 api에
  // 호출할 때 보내야하는거 추가한다고 말해줬음. 추가되면 주석 해제하기
) => {
  const bodyData = {
    withdrawalAccountNo,
    accountTypeUniqueNo,
    savingsBalance,
    // password,
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
