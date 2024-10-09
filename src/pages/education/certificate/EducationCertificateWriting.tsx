import MainWrapper from '@/components/layouts/MainWrapper';
import TopBar from '@/components/layouts/TopBar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const EducationWriting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/education/download');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div>
      <TopBar title='교육 이수증' showXButton={false} showBackButton={false} />
      <MainWrapper>
        <div className='mt-60 flex flex-col items-center text-3xl font-bold'>
          <p> 귀여운 꿀꿀이가 </p>
          <p>이수증 제작하는 중...</p>
        </div>

        <div className='fixed bottom-0 left-0 w-full'>
          <img
            src='/assets/images/write_pig.png'
            alt='Pig'
            className='h-130 w-130'
          />
        </div>
      </MainWrapper>
    </div>
  );
};

export default EducationWriting;
