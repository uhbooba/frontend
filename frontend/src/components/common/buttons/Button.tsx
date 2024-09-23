import React from 'react';
import clsx from 'clsx';

const BUTTON_SIZES = {
  large: 'py-2 w-full text-lg',
  medium: 'py-2 w-full text-md',
  small: 'py-2 w-full text-sm',
};

const BUTTON_COLORS = {
  orange: 'bg-primary  focus:border-blue-400 focus:text-blue-400',
  red: 'bg-red-main focus:border-blue-400 focus:text-blue-400',
  green: 'bg-green-main  focus:border-blue-400 focus:text-blue-400',
  white: 'bg-white-500 focus:border-blue-300 focus:text-blue-400',
  blue: 'bg-blue-500',
};

export type ButtonConfigType = {
  label: string;
  route: string;
  size: keyof typeof BUTTON_SIZES;
  color: keyof typeof BUTTON_COLORS;
  className: string;
};

type ButtonProps = {
  label: string;
  size?: keyof typeof BUTTON_SIZES;
  color?: keyof typeof BUTTON_COLORS;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
};

const Button: React.FC<ButtonProps> = ({
  label,
  size = 'large',
  color = 'orange',
  onClick,
  disabled = false,
  className,
  type,
}) => {
  return (
    <button
      className={clsx(
        'rounded-md font-bold ease-in-out focus:outline-none',
        BUTTON_COLORS[color],
        BUTTON_SIZES[size],
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
