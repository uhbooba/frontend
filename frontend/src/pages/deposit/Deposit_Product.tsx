import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';

const DepositProduct = () => {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/deposit/password');
  };

  return (
    <div>
      {/* 상단바 */}
      <TopBar title='예금 가입 - 가입 상품' />

      <div className='mt-2 mb-12'><LevelBar currentLevel={4} totalLevel={5}/></div>

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

export default DepositProduct;
