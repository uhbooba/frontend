import React from 'react';

interface BalloonProps {
  content: string[]; // 여러 문장
  tailPosition?: 'left' | 'center' | 'right'; // 꼬리 위치
  textPosition?: 'left' | 'center' | 'right';
  bubbleSize?: string;
}

const TextBubble: React.FC<BalloonProps> = ({
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
    <div className={`relative mt-24 ${bubbleSize}`}>
      <div className='relative rounded-lg border-2 border-gray-300 bg-gray-100 p-6'>
        {content.map((line, index) => (
          <p
            key={index}
            className={`mt-2 ${textPositionClass} text-xl text-black`}
          >
            {line}
          </p>
        ))}

        {/* 말풍선 꼬리 부분 */}
        <div
          className={`absolute bottom-[-22px] ${tailPositionClass} -translate-x-1/2 transform`}
        >
          {/* 바깥쪽 삼각형 */}
          <div className='h-0 w-0 border-l-[22px] border-r-[22px] border-t-[22px] border-solid border-l-transparent border-r-transparent border-t-gray-300'></div>

          {/* 안쪽 삼각형 */}
          <div className='absolute left-[50%] top-[-1px] h-0 w-0 -translate-x-1/2 transform border-l-[20px] border-r-[20px] border-t-[20px] border-solid border-l-transparent border-r-transparent border-t-gray-100'></div>
        </div>
      </div>
    </div>
  );
};

export default TextBubble;
