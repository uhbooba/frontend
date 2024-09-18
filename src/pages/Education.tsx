import { BottomTab } from '@/components/layouts/BottomTab';
import XTopBar from '@/components/layouts/XTopbar';

const Education = () => {
  return (
    <div>
      <XTopBar title='교육페이지' />



      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default Education;
