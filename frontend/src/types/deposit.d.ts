// DepositAccount 에서 사용
export interface DepositAccountDetail {
  accountName: string;
  accountNo: string;
  accountBalance: string;
  balance: number;
}

// DepositProduct 에서 사용
export interface ProductData {
  accountName: string;
  interestRate: string;
}

// 아래 3개는 CancelDepositProduct 에서 사용
// 중복되는 데이터 타입들 모음
export interface BaseAccountData {
  bankCode: string;
  bankName: string;
  accountNo: string;
  accountName: string;
  interestRate: string;
  accountCreateDate: string;
}

// 사용자의 예금 계좌 목록 조회 데이터 타입
export interface AccountData extends BaseAccountData {
  withdrawalBankCode: string;
  withdrawalAccountNo: string;
  subscriptionPeriod: string;
  depositBalance: string;
  accountExpiryDate: string;
}

// 중도 해지 시 이자 데이터 타입
export interface TerminationInterestData extends BaseAccountData {
  earlyTerminationDate: string;
  depositBalance: string;
  earlyTerminationInterest: string;
  earlyTerminationBalance: string;
}
