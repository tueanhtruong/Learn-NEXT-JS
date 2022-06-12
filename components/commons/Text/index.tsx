import React from 'react';
import cn from 'classnames';

const Text: React.FC<Props> = ({
  children,
  className,
  variant,
  size = 16,
  style = {},
  ...props
}) => {
  const textStyle: React.CSSProperties = { ...style, fontSize: size };
  return (
    <p
      style={textStyle}
      className={cn('cmp-text', className, {
        [`cmp-text__${variant}`]: !!variant,
      })}
      {...props}
    >
      {children}
    </p>
  );
};

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & {
  variant?: 'title' | 'titleUnderline';
  size?: number;
};

export default Text;
