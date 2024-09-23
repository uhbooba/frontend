import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';

const Education = () => {
  return (
    <div>
      <TopBar title='교육페이지' showBackButton={true} showXButton={true} />

      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default Education;
