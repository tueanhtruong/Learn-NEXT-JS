import React from 'react';
import cn from 'classnames';
// import './styles.scss';

const Wrap: React.FC<Props> = ({ children, className }) => {
  return <div className={cn('columns is-multiline', className)}>{children}</div>;
};

const Item: React.FC<Props> = ({ children, variant = 'is-half', className, ...props }) => {
  const isEmpty = !children;
  return (
    <div
      className={cn('column', { 'cmp-grid__item--empty': isEmpty }, variant, className)}
      {...props}
    >
      {children}
    </div>
  );
};

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  variant?:
    | 'is-three-quarters'
    | 'is-two-thirds'
    | 'is-half'
    | 'is-one-third'
    | 'is-one-quarter'
    | 'is-full';
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Wrap,
  Item,
};
