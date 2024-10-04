// utils/calculatePayments.ts

export const calculatePaymentMonths = (
  maturityDate: string,
  selectPeriod: string,
): number => {
  const currentDate = new Date();
  console.log('1 현재날짜', currentDate);
  console.log('2 만기일 문자열', maturityDate);

  // 땡년땡월땡일 문자열을 다시 날짜형식으로 바꾸기
  const convertToDate = (dateString: string) => {
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
  console.log('3 만기일 날짜형식', maturityDateObj);

  const minusTimeSecond = maturityDateObj!.getTime() - currentDate.getTime();
  console.log('4 두 날짜 차이 밀리초로 나온거', minusTimeSecond);

  const minusTimeMonth = Math.floor(
    minusTimeSecond / (1000 * 60 * 60 * 24 * 30),
  );
  console.log('5 두 날짜차이를 개월로 바꾼거', minusTimeMonth);

  const periodNumber = Number(selectPeriod.replace(/[^0-9]/g, ''));
  console.log('6 약정기간 숫자로 바꾼거 ', periodNumber);

  return periodNumber - minusTimeMonth;
};

export const calculatePaidAmount = (
  paymentMonths: number,
  selectMoney: string,
): number => {
  const selectMoneyNumber = Number(selectMoney.replace(/,/g, ''));
  console.log('월납입액 숫자만', selectMoneyNumber);

  return paymentMonths * selectMoneyNumber;
};
