import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/components/layouts/TopBar';
import QuizLevelBar from '@/components/quiz/QuizLevelBar';
import QuizModal from '@/components/quiz/QuizModal';
import { getQuizItem } from '@/services/education';
import { QuizItem } from '@/types/education';
import MainWrapper from '@/components/layouts/MainWrapper';
import TitleText from '@/components/common/TitleText';

const QuizQuestion = () => {
  const navigate = useNavigate();
  const { part } = useParams();
  const totalQuestions = 5;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [quizData, setQuizData] = useState<QuizItem[]>([]);

  const WRONG_TEXT = '앗 오답입니다! \n다시 한번 풀어보세요!';

  // 퀴즈 불러오기
  const fetchQuizData = async () => {
    if (part) {
      try {
        const response = await getQuizItem(part);
        setQuizData(response?.data?.data?.quizzes);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const handleAnswer = (answer: string) => {
    setUserAnswers(answer);
    setShowModal(true);
  };

  const handleNextQuestions = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowModal(false);
    } else {
      navigate('success');
    }
  };

  const handleRetry = () => {
    setShowModal(false);
  };

  const GoEdu = () => {
    navigate('/education');
  };

  return (
    <div>
      <TopBar title='금융 퀴즈' onXButtonClick={GoEdu} />
      <MainWrapper>
        <QuizLevelBar
          currentQuestion={currentQuestionIndex}
          totalQuestions={totalQuestions}
        />
        <div className='mb-8 flex h-52 flex-col px-4'>
          <TitleText>모바일뱅킹</TitleText>
          <p className='mb-8 text-3xl'>
            {quizData[currentQuestionIndex]?.question}
          </p>
        </div>
        <div>
          <button
            className='mb-8 w-full rounded-lg bg-green-main py-10 text-6xl font-bold text-white shadow-lg'
            onClick={() => handleAnswer('O')}
          >
            O
          </button>
          <button
            className='w-full rounded-lg bg-red-main py-10 text-6xl font-bold text-white shadow-lg'
            onClick={() => handleAnswer('X')}
          >
            X
          </button>
        </div>
        {showModal && (
          <QuizModal
            content={
              userAnswers === quizData[currentQuestionIndex].answer
                ? quizData[currentQuestionIndex].comment
                : WRONG_TEXT
            }
            isCorrect={userAnswers === quizData[currentQuestionIndex].answer}
            onNext={handleNextQuestions}
            onRetry={handleRetry}
          />
        )}
      </MainWrapper>
    </div>
  );
};

export default QuizQuestion;
