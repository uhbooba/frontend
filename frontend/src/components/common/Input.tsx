import React, { forwardRef } from 'react';
import clsx from 'clsx';

const INPUT_VARIANTS = {
  full: 'h-14 w-full',
  check: 'h-4 w-4 shadow-md outline-none',
  disabled: 'bg-gray-300',
  label: 'block text-xl font-bold text-gray-600',
  error: 'border-b border-red-500 outline-none',
} as const;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  variant?: keyof typeof INPUT_VARIANTS;
  type?: string;
  value?: string;
  // 입력창을 동일하게 사용하고 싶은데 number 값을 못 받게 설정되어 있어서 이 값을 하나 추가했습니다.
  numberValue?: number;
  disabled?: boolean;
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
            `border-b border-gray-300 text-black outline-none focus:border-orange-300`,
          )}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onClick={onClick}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';
