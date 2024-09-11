// import Button from '../components/common/Button';
// import XButton from '@/components/common/XButton';
import BackButton from '@/components/common/BackButton';
// import CheckButton from '@/components/common/CheckButton';
// import Layout from '@/components/common/layouts/Layout';

const Savings = () => {
  console.log('메인 컴포넌트 렌더링 확인영');
  return (
    <div>
      <div className='bg-gray-400 text-center'>
        <span>여기는 휴대폰 상단 상태바</span>
      </div>

      {/* 상단바 */}
      <div className='flex items-center justify-between border-b-4 bg-white py-4'>
        <BackButton className='ml-4' />
        <span className='absolute left-1/2 -translate-x-1/2 transform text-xl font-bold'>
          적금 가입
        </span>
      </div>
    </div>
  );
};

export default Savings;
