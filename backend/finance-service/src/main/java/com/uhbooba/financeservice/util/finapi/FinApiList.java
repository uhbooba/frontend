package com.uhbooba.financeservice.util.finapi;

public class FinApiList {

    public static class DemandDeposit {

        private static final String BASE_URL = "/edu/demandDeposit/";
        public static final String CREATE_DEPOSIT_API_NAME = "createDemandDeposit";
        public static final String CREATE_DEPOSIT_URL = BASE_URL + CREATE_DEPOSIT_API_NAME;

        public static final String GET_DEPOSIT_API_NAME = "inquireDemandDepositList";
        public static final String GET_DEPOSIT_URL = BASE_URL + GET_DEPOSIT_API_NAME;

        public static final String CREATE_ACCOUNT_API_NAME = "createDemandDepositAccount";
        public static final String CREATE_ACCOUNT_URL = BASE_URL + CREATE_ACCOUNT_API_NAME;

        public static final String GET_ACCOUNTS_API_NAME = "inquireDemandDepositAccountList";
        public static final String GET_ACCOUNTS_URL = BASE_URL + GET_ACCOUNTS_API_NAME;

        public static final String GET_ACCOUNT_API_NAME = "inquireDemandDepositAccount";
        public static final String GET_ACCOUNT_URL = BASE_URL + GET_ACCOUNT_API_NAME;

        public static final String GET_ACCOUNT_HOLDER_API_NAME = "inquireDemandDepositAccountHolderName";
        public static final String GET_ACCOUNT_HOLDER_URL = BASE_URL + GET_ACCOUNT_HOLDER_API_NAME;

        public static final String GET_ACCOUNT_BALANCE_API_NAME = "inquireDemandDepositAccountBalance";
        public static final String GET_BALANCE_URL = BASE_URL + GET_ACCOUNT_BALANCE_API_NAME;

        public static final String DEPOSIT_ACCOUNT_API_NAME = "updateDemandDepositAccountDeposit";
        public static final String DEPOSIT_ACCOUNT_DEPOSIT_URL =
            BASE_URL + DEPOSIT_ACCOUNT_API_NAME;

        public static final String TRANSFER_ACCOUNT_API_NAME = "updateDemandDepositAccountTransfer";
        public static final String TRANSFER_ACCOUNT_URL = BASE_URL + TRANSFER_ACCOUNT_API_NAME;

        public static final String GET_TRANSACTION_HISTORIES_API_NAME = "inquireTransactionHistoryList";
        public static final String GET_TRANSACTION_HISTORIES_URL =
            BASE_URL + GET_TRANSACTION_HISTORIES_API_NAME;

        public static final String GET_TRANSACTION_HISTORY_API_NAME = "inquireTransactionHistory";
        public static final String GET_TRANSACTION_HISTORY_URL =
            BASE_URL + GET_TRANSACTION_HISTORY_API_NAME;
    }

    public static class Deposit {

        private static final String BASE_URL = "/edu/deposit";
        public static final String CREATE_DEPOSIT_URL = BASE_URL + "/createDeposit";
        public static final String GET_DEPOSIT_PRODUCTS_URL = BASE_URL + "/inquireDepositProducts";
        public static final String CREATE_DEPOSIT_ACCOUNT_URL = BASE_URL + "/createDepositAccount";
        public static final String GET_DEPOSIT_ACCOUNT_LIST_URL =
            BASE_URL + "/inquireDepositInfoList";
        public static final String GET_DEPOSIT_ACCOUNT_DETAIL_URL =
            BASE_URL + "/inquireDepositInfoDetail";
        public static final String GET_EXPIRY_INTEREST_URL = BASE_URL + "/inquireExpiryInterest";
        public static final String GET_EARLY_TERMINATION_URL =
            BASE_URL + "/inquireEarlyTerminationInterest";
        public static final String DELETE_ACCOUNT_URL = BASE_URL + "/deleteAccount";

        public static final String CREATE_DEPOSIT_API_NAME = "createDeposit";
        public static final String GET_DEPOSIT_PRODUCTS_API_NAME = "inquireDepositProducts";
        public static final String CREATE_DEPOSIT_ACCOUNT_API_NAME = "createDepositAccount";
        public static final String GET_DEPOSIT_ACCOUNT_LIST_API_NAME = "inquireDepositInfoList";
        public static final String GET_DEPOSIT_ACCOUNT_DETAIL_API_NAME = "inquireDepositInfoDetail";
        public static final String GET_EXPIRY_INTEREST_API_NAME = "inquireExpiryInterest";
        public static final String GET_EARLY_TERMINATION_API_NAME = "inquireEarlyTerminationInterest";
        public static final String DELETE_ACCOUNT_API_NAME = "deleteAccount";
    }

    public static class Exchange {

        private static final String BASE_URL = "/edu";
        private static final String FOREIGN_BASE_URL = "/edu/demandDeposit/foreignCurrency/";
        public static final String EXCHANGE_URL = BASE_URL + "/exchange";
        public static final String EXCHANGE_RATE_URL = BASE_URL + "/exchangeRate";
        public static final String GET_BANK_CURRENCY_URL = BASE_URL + "/bank/inquireBankCurrency";
        public static final String GET_EXCHANGE_ESTIMATE_URL = EXCHANGE_URL + "/estimate";
        public static final String GET_EXCHANGE_RATE_SEARCH_URL = EXCHANGE_RATE_URL + "/search";

        public static final String EXCHANGE_RATE_SEARCH_API_NAME = "exchangeRateSearch";
        public static final String EXCHANGE_RATE_API_NAME = "exchangeRate";
        public static final String ESTIMATE_EXCHANGE_API_NAME = "estimate";
        public static final String EXCHANGE_API_NAME = "updateDemandDepositAccountWithdrawal";
        public static final String INQUIRE_BANK_CURRENCY_API_NAME = "inquireBankCurrency";

        public static final String CREATE_FOREIGN_CURRENCY_DEMAND_DEPOSIT_API_NAME = "createForeignCurrencyDemandDeposit";
        public static final String CREATE_FOREIGN_CURRENCY_DEMAND_DEPOSIT_URL =
            FOREIGN_BASE_URL + CREATE_FOREIGN_CURRENCY_DEMAND_DEPOSIT_API_NAME;

        public static final String GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_LIST_API_NAME = "inquireForeignCurrencyDemandDepositList";
        public static final String GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_LIST_URL =
            FOREIGN_BASE_URL + GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_LIST_API_NAME;

        public static final String CREATE_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_API_NAME = "createForeignCurrencyDemandDepositAccount";
        public static final String CREATE_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_URL =
            FOREIGN_BASE_URL + CREATE_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_API_NAME;

        public static final String GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_LIST_API_NAME = "inquireForeignCurrencyDemandDepositAccountList";
        public static final String GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_LIST_URL =
            FOREIGN_BASE_URL + GET_FOREIGN_CURRENCY_DEMAND_DEPOSIT_ACCOUNT_LIST_API_NAME;
    }

    public static class Savings {

        private static final String BASE_URL = "/edu/savings";

        public static final String CREATE_SAVINGS_PRODUCT_API_NAME = "createProduct";
        public static final String CREATE_SAVINGS_PRODUCT_URL =
            BASE_URL + CREATE_SAVINGS_PRODUCT_API_NAME;

        public static final String GET_SAVINGS_PRODUCTS_API_NAME = "inquireSavingsProducts";
        public static final String GET_SAVINGS_PRODUCTS_URL =
            BASE_URL + GET_SAVINGS_PRODUCTS_API_NAME;

        public static final String CREATE_SAVINGS_ACCOUNT_API_NAME = "createAccount";
        public static final String CREATE_SAVINGS_ACCOUNT_URL =
            BASE_URL + CREATE_SAVINGS_ACCOUNT_API_NAME;

        public static final String GET_SAVINGS_ACCOUNT_LIST_API_NAME = "inquireAccountList";
        public static final String GET_SAVINGS_ACCOUNT_LIST_URL =
            BASE_URL + GET_SAVINGS_ACCOUNT_LIST_API_NAME;

        public static final String GET_SAVINGS_ACCOUNT_DETAIL_API_NAME = "inquireAccount";
        public static final String GET_SAVINGS_ACCOUNT_DETAIL_URL =
            BASE_URL + GET_SAVINGS_ACCOUNT_DETAIL_API_NAME;

        public static final String GET_SAVINGS_PAYMENT_API_NAME = "inquirePayment";
        public static final String GET_SAVINGS_PAYMENT_URL =
            BASE_URL + GET_SAVINGS_PAYMENT_API_NAME;

        public static final String GET_SAVINGS_EXPIRY_INTEREST_API_NAME = "inquireExpiryInterest";
        public static final String GET_SAVINGS_EXPIRY_INTEREST_URL =
            BASE_URL + GET_SAVINGS_EXPIRY_INTEREST_API_NAME;

        public static final String GET_SAVINGS_EARLY_TERMINATION_INTEREST_API_NAME = "inquireEarlyTerminationInterest";
        public static final String GET_SAVINGS_EARLY_TERMINATION_INTEREST_URL =
            BASE_URL + GET_SAVINGS_EARLY_TERMINATION_INTEREST_API_NAME;

        public static final String DELETE_SAVINGS_ACCOUNT_API_NAME = "deleteAccount";
        public static final String DELETE_SAVINGS_ACCOUNT_URL =
            BASE_URL + DELETE_SAVINGS_ACCOUNT_API_NAME;


    }
}
