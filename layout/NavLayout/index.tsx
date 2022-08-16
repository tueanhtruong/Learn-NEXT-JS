import React from 'react';
import { View } from '@/components/commons';
import Navbar from '@/components/Navbar';

const NavLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <View className="ctn-nav-layout">{children}</View>;
    </>
  );
};

type Props = { children: any };

export default NavLayout;
