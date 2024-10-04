package com.uhbooba.financeservice.service;

import com.uhbooba.financeservice.dto.finapi.response.demand_deposit.DemandDepositAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.exchange.ForeignCurrencyAccountResponse;
import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsAccountResponse;
import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.AccountType;
import com.uhbooba.financeservice.entity.UserAccount;
import com.uhbooba.financeservice.exception.BalanceNotValidException;
import com.uhbooba.financeservice.exception.NotFoundException;
import com.uhbooba.financeservice.mapper.AccountMapper;
import com.uhbooba.financeservice.repository.AccountRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    private final AccountMapper accountMapper;

    @Transactional(readOnly = true)
    public Account findByAccountNo(String accountNo) {
        return accountRepository.findByAccountNo(accountNo)
                                .orElseThrow(
                                    () -> new NotFoundException("계좌번호에 해당하는 계좌를 찾을 수 없습니다."));
    }

    @Transactional
    public Account createAccount(
        DemandDepositAccountResponse accountResponse,
        UserAccount userAccount
    ) {
        // 4. DB에 계좌 저장하기
        Account account = accountMapper.toEntity(accountResponse);
        account.setBalance(0L);
        account.setUserAccount(userAccount);
        account.setUsername(userAccount.getUsername());
        return accountRepository.save(account);
    }

    @Transactional
    public Account createAccount(
        DepositAccountResponse accountResponse,
        UserAccount userAccount
    ) {
        // 4. DB에 계좌 저장하기
        Account account = accountMapper.toEntity(accountResponse);
        account.setBalance(0L);
        account.setUserAccount(userAccount);
        account.setUsername(userAccount.getUsername());
        account.setAccountTypeCode(AccountType.FIXED_DEPOSIT);
        account.setAccountTypeName("예금");
        return accountRepository.save(account);
    }

    @Transactional
    public Account createAccount(
        SavingsAccountResponse savingsAccountResponse,
        UserAccount userAccount
    ) {
        Account account = accountMapper.toEntity(savingsAccountResponse);
        account.setBalance(0L);
        account.setUserAccount(userAccount);
        account.setUsername(userAccount.getUsername());
        account.setAccountTypeCode(AccountType.INSTALLMENT_SAVING);
        account.setAccountTypeName("적금");
        return accountRepository.save(account);
    }

    @Transactional
    public void createAccount(
        ForeignCurrencyAccountResponse accountResponse,
        UserAccount userAccount
    ) {
        Account account = accountMapper.toEntity(accountResponse);
        account.setBalance(0L);
        account.setUserAccount(userAccount);  // 사용자 계정과 연결
        account.setUsername(userAccount.getUsername());
        account.setAccountTypeName("외화 수시입출금");
        account.setAccountTypeCode(AccountType.FOREIGN_DEMAND_DEPOSIT);
        accountRepository.save(account);
    }

    @Transactional
    public List<Account> getAccountsByCondition(
        AccountType accountType,
        UserAccount userAccount
    ) {
        return accountRepository.findByAccountTypeCodeAndUserAccount(accountType, userAccount);
    }

    @Transactional
    public Account addAccountBalance(
        Account account,
        Long updatedBalance
    ) {
        Long resultBalance = account.getBalance() + updatedBalance;
        account.setBalance(resultBalance);
        return accountRepository.save(account);
    }

    @Transactional
    public Account subtractAccountBalance(
        Account account,
        Long updatedBalance
    ) {
        Long resultBalance = account.getBalance() - updatedBalance;
        if(resultBalance < 0) {
            throw new BalanceNotValidException("기존 잔액보다 큰 금액을 출금하려 합니다.");
        }
        account.setBalance(resultBalance);
        return accountRepository.save(account);
    }

    @Transactional
    public void deleteAccount(String accountNo) {
        Account accountToDelete = findByAccountNo(accountNo);
        accountRepository.delete(accountToDelete);
    }
}
