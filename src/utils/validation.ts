export const validateName = (name: string) => {
  if (!name.trim()) return '이름을 입력해주세요.';
  if (!/^[가-힣]{2,17}$/.test(name)) return '올바른 이름을 입력해주세요.';
  return '';
};

export const validateUserId = (id: string) => {
  if (!id.trim()) return '아이디를 입력해주세요.';
  if (!/^[a-zA-Z0-9]{4,20}$/.test(id)) return '20자를 넘을 수 없습니다.';
  return '';
};

export const validatePhoneNumber = (phone: string) => {
  if (!phone.trim()) return '전화번호를 입력해주세요.';
  if (!/^\d{10,11}$/.test(phone)) return '올바른 전화번호를 입력해주세요.';
  return '';
};

export const validatePassword = (pw: string) => {
  if (!pw.trim()) return '비밀번호를 입력해주세요.';
  if (!/^\d{6}$/.test(pw)) return '비밀번호는 6자리 숫자여야 합니다.';
  return '';
};
