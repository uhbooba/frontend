import Button from '@/components/common/buttons/Button';
import ErrorText from '@/components/common/ErrorText';
import { Input } from '@/components/common/Input';
import TopBar from '@/components/layouts/TopBar';
import { useNumberInput } from '@/hooks/useNumberInput';
import {
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateUserId,
} from '@/utils/validation';
import { useState } from 'react';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  //const [phoneNumber, setPhoneNumber] = useState('');
  const [password] = useState('');

  const [isPhoneConfirmed, setTsPhoneConfirmed] = useState(false);
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);

  const { value: phoneNumber, onChange: onPhoneNumberChange } =
    useNumberInput();

  const { value: phoneConfirmNumber, onChange: onPhoneConfirmNumberChange } =
    useNumberInput();

  const [errors, setErrors] = useState({
    userName: '',
    userId: '',
    phoneNumber: '',
    password: '',
  });

  // 핸드폰 인증 클릭
  const handlePhoneVerificationClick = () => {
    if (validatePhoneNumber(phoneNumber)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: '올바른 전화번호를 입력해주세요.',
      }));
      return;
    }

    // 서버에 전송 성공시
    setIsPhoneClicked(true);
    setErrors((prev) => ({ ...prev, phoneNumber: '' }));
  };

  const handlePhoneVerification = () => {
    setTsPhoneConfirmed(true);
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      userName: validateName(userName),
      userId: validateUserId(userId),
      phoneNumber: isPhoneConfirmed ? '' : '전화번호 인증이 필요합니다.',
      password: validatePassword(password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      console.log('회원가입 성공');
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
          {errors.userName && <ErrorText content={errors.userName} />}
          <div className='mt-5'>
            <Input
              label='아이디'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              isError={errors.userId !== ''}
              pattern='[a-zA-Z0-9]*'
            />
            {errors.userId && <ErrorText content={errors.userId} />}
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
            {errors.phoneNumber && <ErrorText content={errors.phoneNumber} />}
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
                />
                <Button
                  label='확인'
                  onClick={handlePhoneVerification}
                  size='small'
                  className='ml-2 w-1/3'
                  type='button'
                />
              </div>
              <p className='mt-2 text-green-main'>인증되었습니다.</p>
            </div>
          )}
          <Input
            label='비밀번호'
            value={password}
            type='password'
            onClick={() => {}}
            isError={errors.password !== ''}
          />
          {errors.password && <ErrorText content={errors.password} />}
          <div className='mt-3 flex flex-col justify-center'>
            <Button label='회원가입' size='large' type='submit' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
