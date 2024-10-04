import TopBar from '@/components/layouts/TopBar';
import { QuizItem } from '@/components/quiz/QuizItem';
import { useNavigate } from 'react-router';

const QuizMain = () => {
  const navigate = useNavigate();

  const moveQuiz = (path: string) => {
    navigate(`/quiz/${path}`);
  };

  const quizItems = [
    { title: '모바일뱅킹', path: 'mobile-banking' },
    { title: '생활금융', path: 'daily-finance' },
    { title: '금융사기 예방', path: 'fraud-prevention' },
    { title: '기초 금융 상식', path: 'basic-finance' },
    { title: '연금지식', path: 'pension-knowledge' },
    { title: '상속지식', path: 'inheritance-knowledge' },
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
            key={item.path}
            title={item.title}
            icon={<img src='/assets/images/pig.png' className='h-16 w-16' />}
            onClick={() => moveQuiz(item.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizMain;
