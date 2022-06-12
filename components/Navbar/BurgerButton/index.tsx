import React, { useState } from 'react';
import cn from 'classnames';

type Callback = (...args: any[]) => void;

const Navbar: React.FC<Props> = ({ className, isActive, onClick, target }) => {
  const [active, setIsActive] = useState<boolean>(isActive);

  const handleClick = () => {
    onClick && onClick();
    setIsActive((prev) => !prev);
  };

  return (
    <button
      className={cn('navbar-burger', 'burger', { 'is-active': active }, className)}
      aria-label="menu"
      aria-expanded="false"
      data-target={target}
      onClick={handleClick}
      onKeyDown={handleClick}
      tabIndex={0}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  );
};

type Props = {
  isActive: boolean;
  className?: string;
  onClick?: Callback;
  target?: string;
};

export default Navbar;
