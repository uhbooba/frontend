import React from 'react';
import clsx from 'clsx';

interface QuizItemProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const QuizItem = React.forwardRef<HTMLDivElement, QuizItemProps>(
  (
    {
      title,
      description,
      icon,
      className,
      disabled = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'mb-4 flex items-center rounded-lg bg-white px-8 py-12 shadow-md',
          className,
        )}
        onClick={disabled ? undefined : onClick}
        {...props}
      >
        <div className='flex-grow'>
          <h3 className='text-2xl font-bold text-gray-800'>{title}</h3>
          {description && (
            <p className='text-sm text-gray-600'>{description}</p>
          )}
        </div>
        <div className='flex h-12 w-12 items-center justify-center'>{icon}</div>
      </div>
    );
  },
);
