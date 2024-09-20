export interface Errors {
  name: string;
  idNumber: string;
  phoneNumber: string;
  check: string;
}

export const validateInputs = (
  name: string,
  idNumber: string,
  phoneNumber: string,
  check?: string,
): { isValid: boolean; newErrors: Errors } => {
  const newErrors: Errors = {
    name: '',
    idNumber: '',
    phoneNumber: '',
    check: '',
  };

  let isValid = true;

  // 이름 비어두면 안되는 조건
  if (name === '') {
    newErrors.name = '이름을 입력해주세요.';
    isValid = false;
  }
  // 이름 한글만 입력가능하게 조건
  else if (!/^[가-힣]+$/.test(name)) {
    newErrors.name = '한글만 입력 가능합니다.';
    isValid = false;
  }

  // 이름 오타 났을 때 조건
  if (/[ㄱ-ㅎㅏ-ㅣ]/.test(name)) {
    newErrors.name = '이름을 정확하게 입력해주세요.';
    isValid = false;
  }

  // 이름 17자까지만 입력 가능하게 조건
  else if (name.length > 17) {
    newErrors.name = '이름은 17자까지만 입력이 가능합니다.';
    isValid = false;
  }

  // 이름 최소 2글자 이상 입력 가능하게 조건
  else if (name.length < 3) {
    newErrors.name = '이름이 너무 짧습니다.';
    isValid = false;
  }

  // 주민등록번호 비어두면 안되는 조건
  if (idNumber === '') {
    newErrors.idNumber = '주민등록번호를 입력해주세요.';
    isValid = false;
  }

  // 주민등록번호 숫자만 가능하게 조건
  else if (!/^\d+$/.test(idNumber.trim())) {
    newErrors.idNumber = '숫자만 입력 가능합니다.';
    isValid = false;
  }

  // 주민등록번호 6자리 + 7자리 형식 조건
  else if (!/^\d{6}\d{7}$/.test(idNumber)) {
    newErrors.idNumber = 'YYMMDD1234567 형식으로 입력해주세요.';
    isValid = false;
  }

  // 전화번호 비어두면 안되는 조건
  if (phoneNumber.trim() === '') {
    newErrors.phoneNumber = '전화번호를 입력해주세요.';
    isValid = false;
  }

  // 전화번호 숫자만 가능하게 조건
  else if (!/^\d+$/.test(phoneNumber.trim())) {
    newErrors.phoneNumber = '숫자만 입력 가능합니다.';
    isValid = false;
  }

  // 전화번호 형식 조건 (010으로 시작하고, 11자리 숫자)
  else if (!/^010\d{8}$/.test(phoneNumber.trim())) {
    newErrors.phoneNumber = '01012345678 형식으로 입력해주세요.';
    isValid = false;
  }

  // 자동이체 여부 선택 안했을 때 조건
  if (check !== undefined && check === '') {
    newErrors.check = '자동이체 여부를 선택해주세요.';
    isValid = false;
  }

  return { isValid, newErrors };
};
