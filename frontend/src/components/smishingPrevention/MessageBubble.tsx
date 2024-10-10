import { useFormattedContent } from '@/hooks/useFormattedContent';
import clsx from 'clsx';

type MessageBubbleProps = {
  content: string;
  time: string;
  isUser: boolean;
  isTTSPlaying: boolean;
  imgUrl?: string | null;
  onTTSClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLinkClick?: () => void;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  time,
  isUser,
  isTTSPlaying,
  imgUrl,
  onTTSClick,
  onLinkClick,
}) => {
  const formattedContent = useFormattedContent(
    content,
    'text-2xl',
    onLinkClick,
  );

  return (
    <div
      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}
    >
      <div
        className={`flex flex-row ${isUser ? 'max-w-[90%] items-end' : 'items-start'}`}
      >
        <div
          className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
        >
          {imgUrl && (
            <div className='mb-2'>
              <img src={imgUrl} alt='피싱 이미지' className='rounded-md' />
            </div>
          )}
          <div
            className={clsx(
              'break-words rounded-lg p-3',
              isUser ? 'bg-primary text-black' : 'bg-gray-200 text-black',
            )}
          >
            {formattedContent}
          </div>
        </div>
        {/* TTS 버튼 */}
        {!isUser && (
          <div
            className={clsx([
              'ml-3 cursor-pointer rounded-full p-3',
              isTTSPlaying ? 'bg-blue-700' : 'bg-blue-500',
            ])}
            onClick={onTTSClick}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-9 text-white'
            >
              <path d='M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z' />
              <path d='M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z' />
            </svg>
          </div>
        )}
      </div>
      {/* 시간 */}
      <p className='mt-1 text-sm text-gray-500'>{time}</p>
    </div>
  );
};

export default MessageBubble;
