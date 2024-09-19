import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import TopBar from '@/components/layouts/TopBar';
import { useNumberInput } from '@/hooks/useNumberInput';
import { useEffect, useState } from 'react';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  //const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

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
    if (phoneNumber && !/^\d{10,11}$/.test(phoneNumber)) {
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

  const handlePhoneVerification = () => {};

  return (
    <div className='flex min-h-screen'>
      <div className='w-full max-w-md'>
        <TopBar title='회원가입' />
        <form className='item flex flex-col justify-center'>
          <Input
            label='성함'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className='mb-5'
          />
          <Input
            label='아이디'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className='mb-5'
          />
          <div className='flex flex-row'>
            <Input
              label='핸드폰 인증'
              value={phoneNumber}
              onChange={onPhoneNumberChange}
              pattern='[0-9]*'
              inputMode='numeric'
            />
          </div>
          <Button
            label={isPhoneClicked ? '인증번호 재전송' : '인증요청'}
            onClick={handlePhoneVerificationClick}
            size='small'
            type='button'
          />
          {isPhoneClicked && (
            <div className='mt-3 flex flex-row'>
              <Input
                className='w-full'
                value={phoneConfirmNumber}
                onChange={onPhoneConfirmNumberChange}
              />
              <Button
                label='확인'
                onClick={handlePhoneVerification}
                size='small'
                className='w-3/6'
              />
            </div>
          )}
          <Input
            label='비밀번호'
            value={password}
            type='password'
            onClick={() => {}}
          />
          <div className='mt-3 flex flex-col justify-center'>
            <Button label='회원가입' size='large' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
