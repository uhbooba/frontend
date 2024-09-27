package com.uhbooba.financeservice.mapper;

import com.uhbooba.financeservice.dto.finapi.response.deposit.DepositResponse;
import com.uhbooba.financeservice.entity.DepositProduct;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DepositProductMapper {

    DepositProduct toEntity(DepositResponse dto);

    DepositResponse toDto(DepositProduct entity);

    List<DepositResponse> toDto(List<DepositProduct> dto);
}
