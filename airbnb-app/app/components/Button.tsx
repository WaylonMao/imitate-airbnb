'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${
          outline
            ? 'bg-white border-black text-black'
            : 'bg-rose-500 border-rose-500 text-white'
        }
        ${
          small
            ? 'py-1 font-light border-[1px] text-sm'
            : 'py-3 font-semibold border-2 text-md'
        }
      `}
    >
      {Icon && (
        <Icon
          className="
            absolute
            left-4
            top-3
          "
          size={24}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
