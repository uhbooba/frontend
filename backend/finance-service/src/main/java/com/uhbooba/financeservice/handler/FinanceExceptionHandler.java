package com.uhbooba.financeservice.handler;

import com.uhbooba.financeservice.dto.CommonResponse;
import com.uhbooba.financeservice.exception.DemandDepositAccountAlreadyExistException;
import com.uhbooba.financeservice.exception.FinOpenApiException;
import com.uhbooba.financeservice.exception.NotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
@Slf4j
public class FinanceExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public CommonResponse<?> handleNotFoundException(NotFoundException ex) {
        log.error(ex.getMessage(), ex);
        return CommonResponse.badRequest(ex.getMessage());
    }

    @ExceptionHandler(DemandDepositAccountAlreadyExistException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<?> handleDemandDepositExceedLimitException(DemandDepositAccountAlreadyExistException ex) {
        log.error(ex.getMessage(), ex);
        return CommonResponse.badRequest(ex.getMessage());
    }

    @ExceptionHandler(FinOpenApiException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<?> handleFinOpenApiException(FinOpenApiException e) {
        log.error(e.getMessage(), e);
        return CommonResponse.badRequest(e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<?> handleRuntimeException(RuntimeException e) {
        log.error(e.getMessage(), e);
        return CommonResponse.badRequest(e.getMessage());
    }

    /**
     * dto의 valid 옵션인 것에 에러 발생시
     *
     * @param ex      : exception
     * @param request : 요청
     * @return : string
     */
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<String> handleIllegalArgumentException(
        IllegalArgumentException ex,
        WebRequest request
    ) {
        return CommonResponse.badRequest(ex.getMessage(), null);
    }

    /**
     * 파라미터 valid 에 벗어나는 잘못된 값을 넣으면 나오는 에러
     *
     * @param ex MethodArgumentNotValidException
     * @return 에러코드 + 에러설명
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // 모든 에러를 가져와서 메시지 구성
        List<String> errorMessages = ex.getBindingResult()
                                       .getFieldErrors()
                                       .stream()
                                       .map(fieldError -> String.format("Field '%s': %s",
                                                                        fieldError.getField(),
                                                                        fieldError.getDefaultMessage()))
                                       .toList();

        // 에러 메시지들을 JSON 형식의 배열로 반환
        String errorMessageJson = errorMessages.stream()
                                               .map(message -> "\"" + message + "\"")
                                               .collect(Collectors.joining(", ", "[", "]"));

        return CommonResponse.badRequest(errorMessageJson, null);
    }
}
