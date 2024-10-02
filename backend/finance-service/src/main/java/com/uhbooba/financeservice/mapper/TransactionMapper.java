package com.uhbooba.financeservice.mapper;

import com.uhbooba.financeservice.dto.request.TransactionCreateRequest;
import com.uhbooba.financeservice.dto.response.TransactionOutputResponse;
import com.uhbooba.financeservice.entity.Transaction;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    Transaction toEntity(TransactionCreateRequest dto);

    TransactionOutputResponse toDto(Transaction dto);

}
