import Button from '@/components/common/buttons/Button';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';

const EducationCertificate = () => {
  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='교육 이수증' />
      </div>

      <div className='mt-20 p-4'>
        <Button label='이수증 발급하기' className='mb-4 py-4' />
      </div>

      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default EducationCertificate;
