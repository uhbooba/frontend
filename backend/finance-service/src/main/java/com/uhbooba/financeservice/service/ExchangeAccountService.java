package com.uhbooba.financeservice.service;

import com.uhbooba.financeservice.dto.finapi.response.exchange.ExchangeResponse;
import com.uhbooba.financeservice.entity.Account;
import com.uhbooba.financeservice.entity.ExchangeAccount;
import com.uhbooba.financeservice.exception.ExchangeAccountNotFoundException;
import com.uhbooba.financeservice.repository.ExchangeAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ExchangeAccountService {

    private final ExchangeAccountRepository exchangeAccountRepository;

    public ExchangeAccount getExchangeAccount(Integer id) {
        return exchangeAccountRepository.findById(id)
                                        .orElseThrow(() -> new ExchangeAccountNotFoundException());
    }

    public ExchangeAccount getExchangeAccountByAccountId(Integer accountId) {
        return exchangeAccountRepository.findByAccountId(accountId)
                                        .orElseThrow(() -> new ExchangeAccountNotFoundException());
    }

    public ExchangeAccount getExchangeAccountByAccountIdAndCurrency(
        Integer accountId,
        String currency
    ) {
        return exchangeAccountRepository.findByAccountIdAndCurrency(accountId, currency);
    }

    @Transactional
    public ExchangeAccount createExchangeAccount(
        ExchangeResponse exchangeResponse,
        Account account
    ) {
        ExchangeAccount exchangeAccount = ExchangeAccount.builder()
                                                         .account(account)
                                                         .exchangeRate(
                                                             exchangeResponse.exchangeCurrency()
                                                                             .exchangeRate())
                                                         .balance(0L)
                                                         .currency(
                                                             exchangeResponse.exchangeCurrency()
                                                                             .currency())
                                                         .build();
        return exchangeAccountRepository.save(exchangeAccount);
    }

    public ExchangeAccount updateExchangeAccount(
        ExchangeResponse exchangeResponse,
        Account account
    ) {
        ExchangeAccount exchangeAccount = getExchangeAccountByAccountIdAndCurrency(account.getId(),
                                                                                   exchangeResponse.exchangeCurrency()
                                                                                                   .currency());
        if(exchangeAccount == null) {
            exchangeAccount = createExchangeAccount(exchangeResponse, account);
        }

        exchangeAccount.setBalance(Long.valueOf(exchangeAccount.getBalance() + Long.parseLong(
            exchangeResponse.exchangeCurrency()
                            .amount())));

        return exchangeAccountRepository.save(exchangeAccount);
    }
}
