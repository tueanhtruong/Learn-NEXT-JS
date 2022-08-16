import React from 'react';

const EmptyLayout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children};</>;
};

export type LayoutProps = { children: any };

export default EmptyLayout;
