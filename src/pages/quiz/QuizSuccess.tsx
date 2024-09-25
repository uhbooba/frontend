import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { useEffect } from 'react';
import { runConfetti } from '@/utils/confetti';
import TextBubble from '@/components/common/TextBubble';
import Button from '@/components/common/buttons/Button';

const QuizSuccess = () => {
  const navigate = useNavigate();

  const moveQuizMainPage = () => {
    navigate('/quiz');
  };

  useEffect(() => {
    runConfetti();
  });

  const GoEdu = () => {
    navigate('/study');
  };

  return (
    <div className='flex flex-col'>
      <TopBar title='금융 퀴즈' onXButtonClick={GoEdu} />
      <div className='h-full'>
        <div className='flex flex-col items-center justify-center'>
          <TextBubble
            content={['모든 문제를', '해결하셨습니다!']}
            tailPosition='center'
          />
          <img
            src='/assets/images/savings_pig.png'
            alt='Pig'
            className='mt-8 h-56 w-56'
          />
          <div className='mt-8 w-3/4'>
            <Button
              label='다른 문제 풀기'
              size='large'
              onClick={moveQuizMainPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSuccess;
