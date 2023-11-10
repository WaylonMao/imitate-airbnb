'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
      rounded-xl
      border-2
      flex
      flex-col
      gap-3
      p-4
      transition
      cursor-pointer
      hover:border-black
      ${selected ? 'border-black' : 'border-neutral-200'}
    `}
    >
      <Icon size={30} />
      <div
        className="font-semibold"
      >{label}</div>
    </div>
  );
};

export default CategoryInput;
