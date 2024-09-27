package com.uhbooba.financeservice.mapper;

import com.uhbooba.financeservice.dto.finapi.response.savings.SavingsResponse;
import com.uhbooba.financeservice.entity.SavingsProduct;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SavingsProductMapper {

    SavingsProduct toEntity(SavingsResponse dto);

    SavingsResponse toDto(SavingsProduct entity);

    List<SavingsResponse> toDto(List<SavingsProduct> dto);
}
