// SavingAccount에서 사용
export interface SavingAccountDetail {
  accountName: string;
  accountNo: string;
  balance: string;
  depositBalance: string;
  subscriptionPeriod: string;
}

// CancelSavingProduct 에서 사용
export interface CancelProductData {
  accountName: string;
  accountNo: string;
  interestRate: string;
  earlyTerminationInterestRate: string;
}

// SavingProduct에서 사용
export interface ProductData {
  accountName: string;
  interestRate: string;
}
