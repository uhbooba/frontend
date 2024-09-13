import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';

const DepositSuccess = () => {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/');
  };

  return (
    <div>
      {/* 상단바 */}
      <TopBar title='예금 가입7 - 가입성공' />

      <div className='bg-gray-400 py-4 text-center'>단계표시바</div>

      <div className='mx-4 mt-8 flex justify-between space-x-4'>
        <Button
          label='이전'
          size='medium'
          color='orange'
          onClick={() => GoBack()}
        />
        <Button
          label='다음'
          size='medium'
          color='orange'
          onClick={() => GoNext()}
        />
      </div>
    </div>
  );
};

export default DepositSuccess;
