import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/components/layouts/TopBar';
import QuizLevelBar from '@/components/quiz/QuizLevelBar';
import QuizModal from '@/components/quiz/QuizModal';
import { getQuizItem } from '@/services/education';
import { QuizItem } from '@/types/quiz';

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
  const getQuiz = async () => {
    if (part) {
      const response = await getQuizItem(part);
      setQuizData(response?.data?.data?.quizzes);
    }
  };

  useEffect(() => {
    getQuiz();
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
      <QuizLevelBar
        currentQuestion={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />
      <div className='my-8 flex flex-col px-4'>
        <h2 className='mb-6 text-4xl font-bold'>모바일뱅킹</h2>
        <p className='mb-8 text-3xl'>
          {quizData[currentQuestionIndex]?.question}
        </p>
      </div>
      <div>
        <button
          className='mb-12 w-full rounded-lg bg-green-main py-10 text-6xl font-bold text-white shadow-lg'
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
    </div>
  );
};

export default QuizQuestion;
