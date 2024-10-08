import { axiosInstance } from '@/utils/axiosInstance';

// 환전하기
export const postExchange = async (
  accountNo: string,
  exchangeCurrency: string,
  amount: string,
  password: string,
) => {
  const exchangeAmount = Number(amount);
  const bodyData = {
    accountNo,
    exchangeCurrency,
    exchangeAmount,
    password,
  };

  const response = await axiosInstance.post(
    '/finances/exchanges/exchange',
    bodyData,
  );
  return response;
};

// 환전 예상 금액 조회
export const postExchangeAmount = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number,
) => {
  const bodyData = {
    fromCurrency,
    toCurrency,
    amount,
  };

  const response = await axiosInstance.post(
    '/finances/exchanges/estimates',
    bodyData,
  );
  return response;
};

// 환율 조회
export const getExchangeRate = async (currency: string) => {
  const response = await axiosInstance(
    `/finances/exchanges/rates/detail?currency=${currency}`,
  );
  return response;
};
