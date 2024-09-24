import React from 'react';

interface QuizItemProps {
  currentQuestion: number;
  totalQuestions: number;
}

const QuizLevelBar: React.FC<QuizItemProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  return (
    <div className='my-5 flex items-center justify-center'>
      {[...Array(totalQuestions)].map((_, index) => (
        <div key={index} className='flex flex-col items-center'>
          <div className='flex items-center'>
            <div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                  index < currentQuestion
                    ? 'bg-green-main text-white'
                    : index === currentQuestion
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentQuestion ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-6'
                  >
                    <path
                      fillRule='evenodd'
                      d='M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-6'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </div>
              <p className='mt-1 text-center text-xs'>{index + 1}번</p>
            </div>
            {index < totalQuestions - 1 && (
              <div
                className={`mb-3 h-0.5 w-8 ${index < currentQuestion ? 'bg-green-main' : 'bg-gray-200'}`}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizLevelBar;
