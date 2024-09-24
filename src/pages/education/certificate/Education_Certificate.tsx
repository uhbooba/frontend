import Button from '@/components/common/buttons/Button';
import TextBubble from '@/components/common/TextBubble';
import { BottomTab } from '@/components/layouts/BottomTab';
import TopBar from '@/components/layouts/TopBar';
import { useNavigate } from 'react-router';

const EducationCertificate = () => {
  const navigate = useNavigate();

  const GoNext = () => {
    navigate('/education/writing');
  };
  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='교육 이수증' />
      </div>

      <div className='ml-4'>
        <TextBubble
          content={[
            '스탬프 7개를 모두 모으면',
            '이수증을 발급할 수 있습니다.',
            '현재 모은 스탬프는 @개입니다.',
            '스탬프 #개를 더 모아야합니다.',
          ]}
          tailPosition='right'
          textPosition='left'
          bubbleSize='w-[340px]'
        />
      </div>

      <div className=''>
        <img
          src='/assets/images/certi_pig.png'
          alt='Cer_Pig'
          className='ml-20 mt-8 h-60 w-60'
        />
      </div>

      <div className='mt-4 p-4'>
        <Button
          label='이수증 발급하기'
          className='mb-4 py-4'
          onClick={() => GoNext()}
        />
      </div>

      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default EducationCertificate;
