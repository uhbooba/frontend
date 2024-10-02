import React from 'react';
import clsx from 'clsx';

export type SmishingButtonConfigType = {
  label: string;
  onClick: () => void;
  className: string;
};

type SmishingButtonProps = {
  label: string | React.ReactNode;
  onClick: () => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
};

const SmishingButton: React.FC<SmishingButtonProps> = ({
  label,
  onClick,
  className,
  type = 'button',
}) => {
  return (
    <button
      className={clsx(
        'rounded-md font-bold transition duration-300 ease-in-out hover:bg-orange-400 focus:outline-none',
        className,
      )}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default SmishingButton;
