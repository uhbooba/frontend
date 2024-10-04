package com.uhbooba.financeservice.mapper;

import com.uhbooba.financeservice.dto.finapi.response.UserAccountResponse;
import com.uhbooba.financeservice.entity.UserAccount;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserAccountMapper {

    @Mapping(source = "realUserId", target = "userId")
    UserAccount toEntity(UserAccountResponse dto);


}
