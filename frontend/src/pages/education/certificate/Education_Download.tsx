import Button from '@/components/common/buttons/Button';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';

const EducationDownload = () => {
  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='이수증 다운로드' />
      </div>

      <div className='mt-20 p-4'>
        <Button
          label={
            <span className='flex items-center'>
              <span className='mr-2'>저장하기</span>
              <img
                src='/assets/images/download.png'
                alt='Download Icon'
                className='h-5 w-5'
              />
            </span>
          }
          className='mb-4 flex items-center justify-center py-4'
        />
      </div>

      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default EducationDownload;
