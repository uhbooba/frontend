import Button from '@/components/common/buttons/Button';
import BackButton from '@/components/common/buttons/BackButton';
import { useNavigate } from 'react-router';

const DepositSuccess = () => {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/deposit/account');
  };

  return (
    <div>
      <div className='bg-gray-400 text-center'>
        <span>여기는 휴대폰 상단 상태바</span>
      </div>

      {/* 상단바 */}
      <div className='flex items-center justify-between border-b-4 bg-white py-4'>
        <BackButton className='ml-4' />
        <span className='absolute left-1/2 -translate-x-1/2 transform text-xl font-bold'>
          예금 가입7 - 가입성공
        </span>
      </div>

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
