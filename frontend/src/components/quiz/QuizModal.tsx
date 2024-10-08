interface QuizModalProps {
  content: string | React.ReactNode;
  isCorrect: boolean;
  onNext?: () => void;
  onRetry?: () => void;
  retryText?: string;
  nextText?: string;
}

const QuizModal: React.FC<QuizModalProps> = ({
  content,
  isCorrect,
  onNext,
  onRetry,
  retryText = '다시 풀기',
  nextText = '다음 문제',
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-11/12 max-w-md'>
        {/* 아이콘 */}
        <div className='absolute -top-12 left-1/2 flex h-24 w-24 -translate-x-1/2 transform items-center justify-center rounded-full bg-white shadow-lg'>
          <div
            className={`flex size-16 items-center justify-center rounded-full ${isCorrect ? 'bg-green-200' : 'bg-red-200'}`}
          >
            <div className='size-10 rounded-full bg-white'>
              {isCorrect ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='size-10 text-green-main'
                >
                  <path
                    fillRule='evenodd'
                    d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='size-10 text-red-main'
                >
                  <path
                    fillRule='evenodd'
                    d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
        {/* 본문 */}
        <div className='rounded-xl bg-white p-8 px-10 pt-16 shadow-lg'>
          <div className='mb-6 whitespace-pre-line text-center text-xl'>
            {content}
          </div>

          {/* 버튼 */}
          <button
            className={`w-full rounded-xl py-5 text-2xl text-white ${
              isCorrect ? 'bg-green-main' : 'bg-red-main'
            }`}
            onClick={isCorrect ? onNext : onRetry}
            type='button'
          >
            {isCorrect ? nextText : retryText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
