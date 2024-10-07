import Button from '@/components/common/buttons/Button';
import ErrorText from '@/components/common/ErrorText';
import { Input } from '@/components/common/Input';
import Keypad from '@/components/common/KeyPad';
import TopBar from '@/components/layouts/TopBar';
import { useNumberInput } from '@/hooks/useNumberInput';
import {
  checkUsername,
  postSignup,
  postSms,
  postSmsVerify,
} from '@/services/auth';
import {
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateUserId,
} from '@/utils/validation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isIdConfirmed, setIsIdConfirmed] = useState(false);
  const [isPhoneConfirmed, setTsPhoneConfirmed] = useState<boolean | null>(
    null,
  );
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);
  const [keyOpen, setKeyOpen] = useState(false);

  const { value: phoneNumber, onChange: onPhoneNumberChange } =
    useNumberInput();

  const { value: phoneConfirmNumber, onChange: onPhoneConfirmNumberChange } =
    useNumberInput();

  const [timer, setTimer] = useState(600); // 10분
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  const [errors, setErrors] = useState({
    userName: '',
    userId: '',
    phoneNumber: '',
    password: '',
  });

  // 핸드폰 인증 타이머
  useEffect(() => {
    if (isPhoneClicked && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      setIsTimerExpired(true);
    }
  }, [timer, isPhoneClicked]);

  // 핸드폰 인증 클릭
  const handlePhoneVerificationClick = () => {
    if (validatePhoneNumber(phoneNumber)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: '올바른 전화번호를 입력해주세요.',
      }));
      return;
    }

    fetchSendSms();

    // 서버에 전송 성공시
    setIsPhoneClicked(true);
    setTimer(600); // 타이머 초기화
    setIsTimerExpired(false); // 타이머 상태 초기화
    setErrors((prev) => ({ ...prev, phoneNumber: '' }));
  };

  const fetchSendSms = async () => {
    try {
      await postSms(phoneNumber);
    } catch (error) {
      console.error(error);
    }
  };

  // 핸드폰 인증번호 확인
  const handlePhoneVerification = async () => {
    try {
      await postSmsVerify(phoneNumber, phoneConfirmNumber);

      setTsPhoneConfirmed(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          // 인증번호 틀림
          setTsPhoneConfirmed(false);
        } else {
          // 다른 에러 처리
          setErrors((prev) => ({
            ...prev,
            phoneNumber: '인증번호 확인 중 오류가 발생했습니다.',
          }));
        }
      }
    }
  };

  // 아이디 중복확인
  const handleIdVerificationClick = () => {
    if (userId === '') return;
    if (validateUserId(userId)) {
      setErrors((prev) => ({
        ...prev,
        userId: '올바른 아이디를 입력해주세요.',
      }));
      return;
    }

    // 아이디 중복 체크 로직
    fetchCheckId();
    setIsIdConfirmed(true);
  };

  // 아이디 중복 확인 api
  const fetchCheckId = async () => {
    try {
      const response = await checkUsername(userId);
      if (response.status === 200) {
        setIsIdConfirmed(true);
        setErrors((prev) => ({ ...prev, userId: '' }));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          // 이미 존재하는 아이디
          setIsIdConfirmed(false);
          setErrors((prev) => ({
            ...prev,
            userId: '이미 존재하는 아이디입니다.',
          }));
        } else {
          // 다른 에러 처리
          setErrors((prev) => ({
            ...prev,
            userId: '아이디 확인 중 오류가 발생했습니다.',
          }));
        }
      }
    }
  };

  const keyClick = (num: string) => {
    setPassword((prev) => prev + num);
  };

  const keyDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  // 회원가입 처리
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      userName: validateName(userName),
      userId: isIdConfirmed ? '' : '아이디 중복확인이 필요합니다.',
      phoneNumber: isPhoneConfirmed ? '' : '전화번호 인증이 필요합니다.',
      password: validatePassword(password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      try {
        await postSignup(userName, userId, password, phoneNumber);
        console.log('회원가입 성공');

        navigate('/login');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <TopBar title='회원가입' />
      <div className='h-full w-full max-w-md justify-center'>
        <form
          onSubmit={handleSignup}
          className='mt-12 flex flex-col justify-center'
        >
          <Input
            label='성함'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            isError={errors.userName !== ''}
          />
          {errors.userName && <ErrorText>{errors.userName}</ErrorText>}
          <div className='mt-5 flex flex-col'>
            <div className='flex flex-row'>
              <Input
                label='아이디'
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                isError={errors.userId !== ''}
                pattern='[a-zA-Z0-9]*'
              />
              <Button
                label='중복 확인'
                onClick={handleIdVerificationClick}
                size='small'
                className='ml-2 w-4/12'
                type='button'
              />
            </div>
            {errors.userId ? (
              <ErrorText>{errors.userId}</ErrorText>
            ) : isIdConfirmed ? (
              <ErrorText color='green'>사용 가능한 아이디입니다.</ErrorText>
            ) : null}{' '}
          </div>
          <div className='mt-5 flex flex-col'>
            <Input
              label='핸드폰 인증'
              value={phoneNumber}
              onChange={onPhoneNumberChange}
              pattern='[0-9]*'
              inputMode='numeric'
              isError={errors.phoneNumber !== ''}
            />
            {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}
          </div>
          <Button
            label={isPhoneClicked ? '인증번호 재전송' : '인증요청'}
            onClick={handlePhoneVerificationClick}
            size='small'
            type='button'
            className='my-5'
          />
          {isPhoneClicked && (
            <div className='mb-5 flex flex-col'>
              <div className='flex flex-row'>
                <Input
                  className='w-full'
                  value={phoneConfirmNumber}
                  onChange={onPhoneConfirmNumberChange}
                  disabled={isPhoneConfirmed === true}
                />
                <Button
                  label='확인'
                  onClick={handlePhoneVerification}
                  size='small'
                  className='ml-2 w-4/12'
                  type='button'
                />
              </div>
              <div className='mt-2 flex flex-row items-center justify-between'>
                <div>
                  {isPhoneConfirmed === false ? (
                    <ErrorText>인증번호가 틀렸습니다.</ErrorText>
                  ) : isPhoneConfirmed === true ? (
                    <ErrorText color='green'>인증이 완료되었습니다.</ErrorText>
                  ) : isTimerExpired ? (
                    <ErrorText>인증 시간이 초과되었습니다.</ErrorText>
                  ) : null}
                </div>
                <div>
                  {!isTimerExpired && !isPhoneConfirmed && (
                    <ErrorText color='green'>
                      남은 시간: {Math.floor(timer / 60)}분 {timer % 60}초
                    </ErrorText>
                  )}
                </div>
              </div>
            </div>
          )}
          <Input
            label='비밀번호'
            value={password}
            type='password'
            readOnly
            onClick={() => setKeyOpen(true)}
            isError={errors.password !== ''}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
          <div className='mt-3 flex flex-col justify-center'>
            <Button label='회원가입' size='large' type='submit' />
          </div>
          {keyOpen && (
            <Keypad
              onNumberClick={keyClick}
              onDeleteClick={keyDelete}
              onConfirmClick={() => setKeyOpen(false)}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
