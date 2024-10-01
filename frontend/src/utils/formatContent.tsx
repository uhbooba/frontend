import React from 'react';

const urlRegex = /(https?:\/\/[^\s]+)/g;

export const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  alert('누르지마세용');
};

export const formatContent = (
  content: string,
  fontSize: string = 'text-2xl',
) => {
  return content.split('\n').map((line, index) => {
    const parts = line.split(urlRegex);
    return (
      <p key={index} className={fontSize}>
        {parts.map((part, partIndex) =>
          part.match(urlRegex) ? (
            <a
              key={partIndex}
              href={part}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline'
              onClick={handleLinkClick}
            >
              {part}
            </a>
          ) : (
            part
          ),
        )}
      </p>
    );
  });
};
