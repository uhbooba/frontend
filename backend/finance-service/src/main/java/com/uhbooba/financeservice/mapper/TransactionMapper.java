package com.uhbooba.financeservice.mapper;

import com.uhbooba.financeservice.dto.request.TransactionCreateRequest;
import com.uhbooba.financeservice.dto.response.TransactionOutputResponse;
import com.uhbooba.financeservice.entity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    Transaction toEntity(TransactionCreateRequest dto);

    @Mapping(target = "updatedAt", source = "updatedAt")
    TransactionOutputResponse toDto(Transaction dto);

}
