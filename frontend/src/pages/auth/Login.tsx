import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import TopBar from '@/components/layouts/TopBar';
import { useState } from 'react';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <TopBar title='로그인' />
      <Input
        label='아이디'
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className='mb-5'
      />
      <Input label='비밀번호' value={password} type='password' />
      <div className='mt-3 flex flex-col justify-center'>
        <Button label='로그인' className='mb-3' />
        <Button label='회원가입' />
      </div>
    </div>
  );
};

export default Login;
