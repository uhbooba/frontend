import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import XTopBar from '@/components/layouts/XTopbar';

const DepositPassword = () => {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/deposit/success');
  };

  return (
    <div>
      <XTopBar title='예금 가입 - 비밀번호' />

      <div className='mt-2 mb-12'><LevelBar currentLevel={5} totalLevel={5}/></div>

      <div className="absolute bottom-24 left-0 flex w-full justify-between space-x-4 px-4">
        <Button
          label="이전"
          size="medium"
          color="orange"
          onClick={GoBack}
        />
        <Button
          label="다음"
          size="medium"
          color="orange"
          onClick={GoNext} 
        />
      </div>

      {/* 바텀탭 */}
      <div className="fixed bottom-0 left-0 w-full">
        <BottomTab />
      </div>
    </div>
  );
};

export default DepositPassword;
