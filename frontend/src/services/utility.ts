import { axiosInstance } from '@/utils/axiosInstance';

// 공과금 납부
export const postUtilityPay = async (
  corporation: string,
  amount: number,
  password: string,
) => {
  const bodyData = {
    corporation,
    amount,
    password,
  };

  const response = await axiosInstance.post(
    '/finances/utilities/payment',
    bodyData,
  );
  return response;
};
