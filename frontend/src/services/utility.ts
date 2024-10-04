import { axiosInstance } from '@/utils/axiosInstance';

// 공과금 납부
export const postUtilityPay = async (corporation: string, amount: number) => {
  const bodyData = {
    corporation,
    amount,
  };

  const response = await axiosInstance.post(
    '/finances/utilities/payment',
    bodyData,
  );
  return response;
};
