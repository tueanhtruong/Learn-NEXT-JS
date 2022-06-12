import React, { HTMLProps } from 'react';
import cn from 'classnames';
import { View } from '../commons';
// import Footer from 'src/components/Footer';

const Screen: React.FC<Props> = ({
  showNavbar,
  showSidebar,
  collapseSidebar,
  showMiniSidebar,
  children,
}) => {
  return (
    <View
      className={cn('cmp-screen', {
        ['cmp-screen__navbar']: showNavbar,
        ['cmp-screen__sidebar']: showSidebar,
        ['is-collapse']: collapseSidebar,
        ['is-mini']: showMiniSidebar,
      })}
    >
      {children}
    </View>
  );
};

type Props = HTMLProps<HTMLDivElement> & {
  showNavbar?: boolean;
  showSidebar?: boolean;
  collapseSidebar?: boolean;
  showMiniSidebar?: boolean;
};

export default Screen;
