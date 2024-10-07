// utils/calculatePayments.ts

export const calculatePaymentMonths = (
  maturityDate: string,
  selectPeriod: string,
): number => {
  const currentDate = new Date();

  // 땡년땡월땡일 문자열을 다시 날짜형식으로 바꾸기
  const convertToDate = (dateString: string) => {
    if (!dateString) {
      throw new Error('maturityDate가 없음');
    }

    const parts = dateString.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/);
    if (!parts) {
      throw new Error('유효하지 않은 날짜 형식입니다.');
    }

    const year = parseInt(parts[1], 10);
    const month = parseInt(parts[2], 10) - 1;
    const day = parseInt(parts[3], 10);
    return new Date(year, month, day);
  };

  const maturityDateObj = convertToDate(maturityDate);

  const minusTimeSecond = maturityDateObj!.getTime() - currentDate.getTime();

  const minusTimeMonth = Math.floor(
    minusTimeSecond / (1000 * 60 * 60 * 24 * 30),
  );

  const periodNumber = Number(selectPeriod.replace(/[^0-9]/g, ''));

  return periodNumber - minusTimeMonth;
};

export const calculatePaidAmount = (
  paymentMonths: number,
  selectMoney: string,
): number => {
  const selectMoneyNumber = Number(selectMoney.replace(/,/g, ''));

  return paymentMonths * selectMoneyNumber;
};
