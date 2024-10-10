import React from 'react';
import clsx from 'clsx';

const BUTTON_SIZES = {
  large: 'py-4 w-full text-2xl',
  medium: 'py-2 w-full text-xl',
  small: 'py-2 w-full text-lg',
  customMedium: 'py-2 w-24 text-xl',
};

const BUTTON_COLORS = {
  orange: 'bg-primary',
  red: 'bg-red-main',
  green: 'bg-green-main',
  white: 'bg-white-500',
  blue: 'bg-blue-500',
  lightOrange: 'bg-[#FFD362]',
};

export type ButtonConfigType = {
  label: string;
  route: string;
  size?: keyof typeof BUTTON_SIZES;
  color?: keyof typeof BUTTON_COLORS;
  className?: string;
  img?: string;
  eduImg?: string;
  eduLabel?: string;
  amount?: number;
};

type ButtonProps = {
  label: string | React.ReactNode;
  size?: keyof typeof BUTTON_SIZES;
  color?: keyof typeof BUTTON_COLORS;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  img?: string;
  eduImg?: string;
  eduLabel?: string;
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
  img,
  eduImg,
  eduLabel,
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
      {img && (
        <img
          src={img}
          alt={`${label} 이미지`}
          className='mx-auto mb-2 h-12 w-12'
        />
      )}

      {eduImg && (
        <img
          src={eduImg}
          alt={`${label} 이미지`}
          className='ml-4 mr-12 h-28 w-28'
        />
      )}

      {eduLabel && <span className='mt-8 text-3xl'> {eduLabel}</span>}

      {label}
    </button>
  );
};

export default Button;
