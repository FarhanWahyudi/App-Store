import React from 'react';

type propTypes = {
  disabled?: boolean;
  type: 'submit' | 'button' | 'reset' | undefined;
  size: string;
  style: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ disabled, type, size, style, children, onClick }: propTypes) {
  return (
    <button onClick={onClick} type={type} className={`text-center ${size} ${style}`} disabled={disabled}>
      {children}
    </button>
  );
}
