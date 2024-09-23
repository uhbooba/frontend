import Button from '@/components/common/buttons/Button';
import ErrorText from '@/components/common/ErrorText';
import { Input } from '@/components/common/Input';
import TopBar from '@/components/layouts/TopBar';

import { useState } from 'react';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    setErrorMessage('');

    if (userId.trim() === '' || password.trim() === '') {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
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
          <Input label='비밀번호' value={password} type='password' />
          {errorMessage && <ErrorText content={errorMessage} />}
          <div className='mt-3 flex flex-col justify-center'>
            <Button label='로그인' className='mb-3' onClick={handleLogin} />
            <Button label='회원가입' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
