import TopBar from '@/components/layouts/TopBar';
import { QuizItem } from '@/components/quiz/QuizItem';
import { useNavigate } from 'react-router';

const QuizMain = () => {
  const navigate = useNavigate();

  const moveQuiz = (path: string) => {
    navigate(`/quiz/${path}`);
  };

  const quizItems = [
    { part: 1, topic: '모바일 뱅킹 활용법' },
    { part: 2, topic: '생활 속 금융' },
    { part: 3, topic: '금융사기 주의' },
    { part: 4, topic: '기초 금융 상식' },
    { part: 5, topic: '연금 제도 이해' },
    { part: 6, topic: '상속 및 유산 관리' },
  ];

  const GoEdu = () => {
    navigate('/education');
  };

  return (
    <div>
      <TopBar title='금융 퀴즈' onXButtonClick={GoEdu} />
      <div>
        {quizItems.map((item) => (
          <QuizItem
            key={item.part}
            title={item.topic}
            icon={<img src='/assets/images/pig.png' className='h-16 w-16' />}
            onClick={() => moveQuiz(`${item.part}`)}
            className='cursor-pointer'
          />
        ))}
      </div>
    </div>
  );
};

export default QuizMain;
