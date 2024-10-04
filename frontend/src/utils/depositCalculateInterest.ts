export const depositCalculateInterest = (
  selectMoney: string,
  interestRate: number,
): { interest: number; totalAmount: number } => {
  if (selectMoney) {
    // 가입금액을 쉼표 빼고 숫자형식으로 변신시키기
    const selectMoneyNumber = Number(selectMoney.replace(/,/g, ''));
    // 이자율 백분율로 만들어주기
    const rate = interestRate / 100;

    // 예상이자 계산하기 (가입금액 곱하기 이자율)
    const interest = selectMoneyNumber * rate;

    // 예상금액 계산하기 (가입금액 + 예상이자)
    const totalAmount = selectMoneyNumber + interest;

    return { interest, totalAmount };
  }

  return { interest: 0, totalAmount: 0 };
};
