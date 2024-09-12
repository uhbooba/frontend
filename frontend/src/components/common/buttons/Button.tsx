import React from 'react';
import clsx from 'clsx';

export const BUTTON_SIZES = {
  large: 'py-2 w-full text-lg',
  medium: 'py-2 w-full text-md',
  small: 'py-2 w-full text-sm',
};

export const BUTTON_COLORS = {
  orange: 'bg-orange-500 hover:bg-orange-600 hover:text-white',
  red: 'bg-red-500 hover:bg-red-600 hover:text-white',
  green: 'bg-green-500 hover:bg-green-600 hover:text-white',
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
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  size = 'large',
  color = 'orange',
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <button
      className={clsx(
        'rounded-md font-bold transition duration-300 ease-in-out focus:outline-none',
        BUTTON_COLORS[color],
        BUTTON_SIZES[size],
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
