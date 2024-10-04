export const calculateMaturityDate = (months: string) => {
  const currentDate = new Date(); // 현재 날짜 가져오기
  const periodInMonths = parseInt(months.replace('개월', ''), 10); // 선택한 버튼 값 숫자로 변경
  currentDate.setMonth(currentDate.getMonth() + periodInMonths); // 현재날짜 + 선택 개월수

  // 한국식 날짜로 변환하기 (2222년 22월 22일처럼 바꾸는컷)
  return currentDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
