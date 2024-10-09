import Button from '@/components/common/buttons/Button';
import ErrorText from '@/components/common/ErrorText';
import { Input } from '@/components/common/Input';
import { postLogin } from '@/services/auth';
import Keypad from '@/components/common/KeyPad';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import MainWrapper from '@/components/layouts/MainWrapper';
import { requestNotificationPermission } from '@/services/notification';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [keyOpen, setKeyOpen] = useState(false);

  const handleLogin = async () => {
    setErrorMessage('');

    if (userId.trim() === '' || password.trim() === '') {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const fcmToken = await requestNotificationPermission();

      if (fcmToken) {
        await fetchLogin(fcmToken);
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  const fetchLogin = async (fcmToken: string) => {
    try {
      const response = await postLogin(userId, password, fcmToken);

      const token = response?.headers['access'];
      localStorage.setItem('ACCESS_TOKEN', token);

      const isFirstLogin = response?.data?.result?.isFirstLogin;

      navigate('/', { state: { isFirstLogin } });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
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

  return (
    <MainWrapper className='flex'>
      <div className='mt-10 flex flex-1 flex-col items-center justify-center'>
        <h1 className='text-5xl font-semibold'>어부바</h1>
        <img
          src={'https://s3.youm.me/uhbooba/icons%2Fpig.png'}
          className='h-40 w-40 p-2'
        />
        <div className='w-full max-w-md p-4'>
          <Input
            label='아이디'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className='mb-5'
          />
          <Input
            label='비밀번호'
            value={password}
            type='password'
            readOnly
            inputMode='none'
            onClick={() => setKeyOpen(true)}
          />
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          <div className='mt-5 flex flex-col justify-center'>
            <Button label='로그인' className='mb-3' onClick={handleLogin} />
            <Button label='회원가입' onClick={() => navigate('/signup')} />
          </div>
        </div>
        {keyOpen && (
          <Keypad
            onNumberClick={keyClick}
            onDeleteClick={keyDelete}
            onConfirmClick={() => setKeyOpen(false)}
          />
        )}
      </div>
    </MainWrapper>
  );
};

export default Login;
