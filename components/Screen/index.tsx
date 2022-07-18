import React, { HTMLProps } from 'react';
import cn from 'classnames';
import { View } from '../commons';
import { useRouter } from 'next/router';
import { HIDE_NAV_PATHS } from '../../app-config/paths';
// import Footer from 'src/components/Footer';

const Screen: React.FC<Props> = ({
  showNavbar,
  showSidebar,
  collapseSidebar,
  showMiniSidebar,
  children,
  location,
}) => {
  const router = useRouter();
  const { pathname } = router;
  const isHideNav = HIDE_NAV_PATHS.includes(pathname);
  return (
    <View
      className={cn('cmp-screen', {
        ['cmp-screen__navbar']: showNavbar && !isHideNav,
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
  location?: string;
};

export default Screen;
