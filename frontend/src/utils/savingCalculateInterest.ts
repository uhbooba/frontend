export const savingCalculateInterest = (
  selectMoney: string,
  interestRate: number,
  periodMonths: string, // periodMonths를 string으로 받음
): { interest: number; totalAmount: number } => {
  if (selectMoney && interestRate && periodMonths) {
    // 이자 = 월납입액 X 납입개월 X 평균납입기간 X 이자율/12

    // 가입기간 문자열에서 숫자만 추출하고 숫자 형식으로 변환
    const periodMonthsNumber = Number(periodMonths.replace(/[^0-9]/g, ''));

    // 가입금액에서 쉼표 제거하고 숫자 형식으로 변환
    const selectMoneyNumber = Number(selectMoney.replace(/,/g, ''));

    // 이자율 백분율로 변환
    const rate = interestRate / 100;

    // 총 납입 원금 계산
    const totalDeposit = selectMoneyNumber * periodMonthsNumber;

    // 평균 납입 기간
    const averagePeriod = (periodMonthsNumber + 1) / 2;

    // 예상 이자 계산
    const estimatedInterest =
      selectMoneyNumber * periodMonthsNumber * averagePeriod * (rate / 12);

    // 예상 총 금액 계산
    const totalAmount = totalDeposit + estimatedInterest;

    return {
      interest: Math.round(estimatedInterest),
      totalAmount: Math.round(totalAmount),
    };
  }

  return { interest: 0, totalAmount: 0 };
};
