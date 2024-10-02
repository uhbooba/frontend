import SmishingButton, { SmishingButtonConfigType } from './SmishingButton';

type MessageBottomProps = {
  isButton: boolean;
  buttons?: SmishingButtonConfigType[];
};

const MessageBottom: React.FC<MessageBottomProps> = ({ isButton, buttons }) => {
  return (
    <div className='sticky bottom-0 w-full bg-white p-4'>
      <div className='mx-auto flex w-full max-w-md flex-col items-center justify-center'>
        <div className='mb-3 flex w-full items-center rounded-md border px-3 py-2 shadow-md'>
          <input
            placeholder='메시지를 입력하세요'
            maxLength={100}
            className='flex-grow rounded-full border-none px-4 py-2 text-sm focus:outline-none'
            readOnly
          />
          <button className='flex items-center justify-center p-2 text-gray-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6'
            >
              <path d='M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z' />
              <path d='M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z' />
            </svg>
          </button>
        </div>
        {isButton && buttons && (
          <div>
            {buttons.map((button, index) => (
              <SmishingButton
                key={index}
                label={button.label}
                onClick={button.onClick}
                className={button.className}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBottom;
