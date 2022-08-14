import cn from 'classnames';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { IMAGES } from '@/app-config/images';
import { PATHS } from '@/app-config/paths';
import { IRootState } from '@/redux/rootReducer';
import { MuiPopUp, Text, View } from '../../commons';
import { signOutAction } from '@/redux/auth/authSlice';
import Image from 'next/image';

const Navbar: React.FC<Props> = ({ isAuthenticated = false, profile }) => {
  const [fixedNavbar, setFixedNavbar] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setFixedNavbar(!!window.pageYOffset);
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navbarUnAuthItems = [
    {
      id: 'Dev',
      label: 'Dev Center',
      href: PATHS.dev,
    },

    {
      id: 'LogIn',
      label: 'LOG IN',
      href: PATHS.signIn,
    },
  ];

  const navbarAuthItems = [
    {
      id: 'Dev',
      label: 'Dev Center',
      href: PATHS.dev,
    },
    {
      id: 'profile',
      label: 'My Profile',
      href: PATHS.myProfile,
    },
    {
      id: 'UserName',
      label: profile?.displayName || 'Anonymous',
    },
  ];

  const listItems = isAuthenticated ? navbarAuthItems : navbarUnAuthItems;
  const menuList = (className: string) => (
    <View
      className={`cmp-landing-nav__container__right__list dropdown-items ${className}`}
      isRowWrap
      align="center"
      justify="center"
      flexGrow={1}
    >
      {listItems.map((item, idx) => {
        const isLink = !!item.href;
        if (isLink)
          return (
            <Link href={item.href} key={`${item.id}-${idx}`}>
              <a>
                <Text>{item.label}</Text>
              </a>
            </Link>
          );
        return <Text key={`${item.id}-${idx}`}>{item.label}</Text>;
      })}
    </View>
  );
  return (
    <nav
      className={cn('cmp-landing-nav', {
        'fixed-nav-bar': fixedNavbar,
      })}
      ref={navbarRef}
      role="navigation"
      aria-label="main navigation"
    >
      <View isRow className="c-container cmp-landing-nav__container" justify="space-between">
        <View className="cmp-landing-nav__container__left">
          <Image
            className="cmp-landing-nav__logo"
            src={IMAGES.logoCode}
            alt="Unset"
            width={74}
            height={74}
          />
        </View>
        <View className="cmp-landing-nav__container__right">
          <View
            className="cmp-landing-nav__container__right__menu hide-on-desktop"
            isRowWrap
            align="center"
            justify="center"
            flexGrow={1}
          >
            <MuiPopUp
              labelClassName="cmp-landing-nav__container__right__menu"
              label="Menu"
              body={menuList('')}
            />
          </View>
          {menuList('hide-on-mobile')}
        </View>
      </View>
    </nav>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  user: state.auth.authUser,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  profile: state.profile.myProfile,
});

const mapDispatchToProps = (dispatch: (_arg0: { payload: any; type: string }) => any) => ({
  onSignOut: () => dispatch(signOutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
