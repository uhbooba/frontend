import Button from '@/components/common/buttons/Button';
import ErrorText from '@/components/common/ErrorText';
import { Input } from '@/components/common/Input';
import TopBar from '@/components/layouts/TopBar';
import { postLogin } from '@/services/auth';
import Keypad from '@/components/common/KeyPad';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { requestNotificationPermission } from '@/services/notification';

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [keyOpen, setKeyOpen] = useState(false);

  const handleNotification = async () => {
    try {
      const response = await requestNotificationPermission();
      console.log('알림 권한 요청 응답:', response);
    } catch (error) {
      console.error('알림 권한 요청 중 오류 발생:', error);
    }
  };

  const handleLogin = () => {
    setErrorMessage('');

    if (userId.trim() === '' || password.trim() === '') {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    fetchLogin();
  };

  const fetchLogin = async () => {
    try {
      const response = await postLogin(userId, password);

      const token = response?.headers['access'];
      localStorage.setItem('ACCESS_TOKEN', token);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const keyClick = (num: string) => {
    setPassword((prev) => prev + num);
  };

  const keyDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <TopBar title='로그인' />
      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full max-w-md p-6'>
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
            onClick={() => setKeyOpen(true)}
          />
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          <div className='mt-3 flex flex-col justify-center'>
            <Button label='로그인' className='mb-3' onClick={handleLogin} />
            <Button label='회원가입' onClick={() => navigate('/signup')} />
            <Button label='알람테스트' onClick={handleNotification} />
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
    </div>
  );
};

export default Login;
