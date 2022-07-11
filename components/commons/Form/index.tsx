/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { KeyboardEvent } from 'react';

const Form: React.FC<Props> = ({ children, preventDefault = false, ...props }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (preventDefault && event.key === 'Enter') event.preventDefault();
  };

  return (
    <form onKeyDown={handleKeyDown} {...props}>
      {children}
    </form>
  );
};

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
  preventDefault?: boolean;
};

export default Form;
