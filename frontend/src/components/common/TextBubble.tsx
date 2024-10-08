import React from 'react';

interface TextBubbleProps {
  content: string[] | React.ReactNode; // 여러 문장
  tailPosition?: 'left' | 'center' | 'right'; // 꼬리 위치
  textPosition?: 'left' | 'center' | 'right';
  bubbleSize?: string;
}

const TextBubble: React.FC<TextBubbleProps> = ({
  content,
  tailPosition = 'center',
  textPosition = 'right',
  bubbleSize = 'w-[280px]',
}) => {
  const tailPositionClass =
    tailPosition === 'left'
      ? 'left-[30%]'
      : tailPosition === 'right'
        ? 'left-[70%]'
        : 'left-[50%]'; // 기본값은 중앙

  const textPositionClass =
    textPosition === 'left'
      ? 'text-left'
      : tailPosition === 'right'
        ? 'text-right'
        : 'text-center';

  return (
    <div className={`relative ${bubbleSize}`}>
      <div className='relative rounded-lg border-2 border-gray-100 bg-gray-50 p-6 shadow-lg'>
        {Array.isArray(content) ? (
          content.map((line, index) => (
            <p
              key={index}
              className={`mt-2 ${textPositionClass} text-xl text-black`}
            >
              {line}
            </p>
          ))
        ) : (
          <div className={textPositionClass}>{content}</div>
        )}

        {/* 말풍선 꼬리 부분 */}
        <div
          className={`absolute bottom-[-22px] ${tailPositionClass} -translate-x-1/2 transform`}
        >
          {/* 바깥쪽 삼각형 */}
          <div className='h-0 w-0 rounded-lg border-l-[22px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-100'></div>

          {/* 안쪽 삼각형 */}
          <div className='absolute left-[50%] top-[-1px] h-0 w-0 -translate-x-1/2 transform border-l-[20px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-50'></div>
        </div>
      </div>
    </div>
  );
};

export default TextBubble;
