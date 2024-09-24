import React, { forwardRef } from 'react';
import clsx from 'clsx';

const INPUT_VARIANTS = {
  full: 'h-14 w-full',
  check: 'h-4 w-4 shadow-md outline-none',
  disabled: 'bg-gray-300',
  label: 'block text-xl font-bold text-gray-600',
  error: 'border-b border-red-500 outline-none',
  default: 'border-b border-gray-300 text-black outline-none',
} as const;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label?: string;
  className?: string;
  variant?: keyof typeof INPUT_VARIANTS;
  type?: string;
  disabled?: boolean;
  readOnly?: boolean;
  isError?: boolean;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      className,
      variant = 'full',
      type = 'text',
      placeholder = '',
      value,
      onChange,
      disabled,
      onClick,
      isError,
      readOnly,
      ...props
    },
    ref,
  ) => {
    return (
      <div className='relative w-full'>
        {label && (
          <label
            className={clsx(INPUT_VARIANTS['label'], isError && 'text-red-500')}
          >
            {label}
          </label>
        )}
        <input
          className={clsx(
            className,
            INPUT_VARIANTS[variant],
            disabled && INPUT_VARIANTS['disabled'],
            isError && INPUT_VARIANTS['error'],
            INPUT_VARIANTS['default'],
            !readOnly && 'focus:border-orange-300',
          )}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onClick={onClick}
          readOnly={readOnly}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
