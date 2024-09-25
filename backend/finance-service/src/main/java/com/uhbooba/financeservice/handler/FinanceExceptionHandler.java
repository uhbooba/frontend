package com.uhbooba.financeservice.handler;

import com.uhbooba.financeservice.dto.CommonResponse;
import com.uhbooba.financeservice.exception.FinOpenApiException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
@Slf4j
public class FinanceExceptionHandler {

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
    public ResponseEntity<String> handleIllegalArgumentException(
        IllegalArgumentException ex,
        WebRequest request
    ) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /**
     * 파라미터 valid 에 벗어나는 잘못된 값을 넣으면 나오는 에러
     *
     * @param ex MethodArgumentNotValidException
     * @return 에러코드 + 에러설명
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // 모든 에러를 가져와서 메시지 구성
        List<String> errorMessages = ex.getBindingResult()
                                       .getFieldErrors()
                                       .stream()
                                       .map(fieldError -> String.format(
                                           "Field '%s': %s",
                                           fieldError.getField(),
                                           fieldError.getDefaultMessage()
                                       ))
                                       .toList();

        // 에러 메시지들을 JSON 형식의 배열로 반환
        String errorMessageJson = errorMessages.stream()
                                               .map(message -> "\"" + message + "\"")
                                               .collect(Collectors.joining(", ", "[", "]"));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(errorMessageJson);
    }
}
