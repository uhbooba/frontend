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

// SavingAccount에서 사용
export interface AccountDetail {
  accountName: string;
  accountNo: string;
  accountBalance: string;
}
