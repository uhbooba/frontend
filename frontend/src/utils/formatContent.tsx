const urlRegex = /(https?:\/\/[^\s]+)/g;

export const formatContent = (
  content: string,
  fontSize: string = 'text-2xl',
  onLinkClick?: () => void,
) => {
  return content.split('\n').map((line, index) => {
    const parts = line.split(urlRegex);
    return (
      <p key={index} className={fontSize}>
        {parts.map((part, partIndex) =>
          part.match(urlRegex) ? (
            onLinkClick ? (
              <a
                key={partIndex}
                href={part}
                target='_blank'
                rel='noopener noreferrer'
                className='break-all text-blue-500 hover:underline'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onLinkClick();
                }}
              >
                {part}
              </a>
            ) : (
              <span key={partIndex} className='text-blue-500'>
                {part}
              </span>
            )
          ) : (
            part
          ),
        )}
      </p>
    );
  });
};
