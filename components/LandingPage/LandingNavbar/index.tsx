import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { IMAGES } from '../../../app-config/images';
import { PATHS } from '../../../app-config/paths';
import { IRootState } from '../../../redux/rootReducer';
import { Button, Text, View } from '../../commons';
import { ButtonVariant } from '../../commons/Button';
import { signOutAction } from '../../../redux/auth/authSlice';
import Image from 'next/image';
import BurgerButton from '../../Navbar/BurgerButton';

const NAV_TYPES = {
  isNavlink: 'NAV_LINK',
  isButton: 'BUTTON',
  isText: 'TEXT',
};

const Navbar: React.FC<Props> = ({
  user,
  isAuthenticated = false,
  isAdmin,
  profile,
  onSignOut,
}) => {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const location = router.pathname;

  const getUserName = () => {
    if (!profile?.displayName) return 'Anonymous';
    return `${profile.displayName}`;
  };

  const navbarUnAuthItems = [
    {
      id: 'Dev',
      label: 'Dev Center',
      type: NAV_TYPES.isText,
      path: PATHS.dev,
      onClick: () =>
        router.push({
          pathname: PATHS.dev,
        }),
    },

    {
      id: 'LogIn',
      label: 'LOG IN',
      type: NAV_TYPES.isButton,
      onClick: () =>
        router.push({
          pathname: PATHS.signIn,
        }),
    },
  ];

  const navbarAuthItems = [
    {
      id: 'Dev',
      label: 'Dev Center',
      type: NAV_TYPES.isNavlink,
      href: PATHS.dev,
    },
    {
      id: 'profile',
      label: 'My Profile',
      type: NAV_TYPES.isNavlink,
      href: PATHS.myProfile,
    },
    {
      id: 'UserName',
      label: getUserName(),
      type: NAV_TYPES.isText,
    },
  ];

  const renderNavItems = (item: any) => {
    switch (item.type) {
      case NAV_TYPES.isNavlink:
        const isActive = location.includes(item.href);
        return (
          <Link href={item.href} key={item.id}>
            <a
              onClick={() => setToggleNavbar(!toggleNavbar)}
              className={cn('cmp-landing-nav__end--item cmp-landing-nav__end--item--link', {
                'cmp-landing-nav__end--item--active': isActive,
              })}
            >
              {item.label}
            </a>
          </Link>
        );
      case NAV_TYPES.isButton:
        return (
          <Button
            key={item.id}
            variant={item.buttonVar as ButtonVariant}
            label={item.label}
            className={cn('cmp-landing-nav__end--button')}
            onClick={item?.onClick}
            iconPosition="left"
            icon={item?.icon}
          />
        );
      case NAV_TYPES.isText:
        return (
          <Text
            size={14}
            key={item.id}
            onClick={item.onClick}
            className={cn('cmp-landing-nav__end--item', {
              ['cmp-landing-nav__end--item--link']: !!item.onClick,
            })}
          >
            {item.label}
          </Text>
        );
      default:
        return item.label;
    }
  };

  const renderNavListItems = (items: Array<any>) => items.map((item) => renderNavItems(item));

  const listItems = isAuthenticated ? navbarAuthItems : navbarUnAuthItems;
  return (
    <nav
      className={cn('cmp-landing-nav', 'navbar', 'jump-down')}
      ref={navbarRef}
      role="navigation"
      aria-label="main navigation"
    >
      <View className={cn('cmp-landing-nav__container', 'c-container')}>
        <View isRow flexGrow={1} className={cn('cmp-landing-nav__branch', 'navbar-brand')}>
          <Link href={PATHS.root} passHref>
            <a>
              <Image
                className={'justify-center cmp-landing-nav__logo'}
                src={IMAGES.logoEarth}
                alt="Unset"
                width={54}
                height={54}
              />
            </a>
          </Link>

          <BurgerButton
            className={'cmp-landing-nav__burger'}
            target="navigation-menu"
            isActive={toggleNavbar}
            onClick={() => setToggleNavbar(!toggleNavbar)}
          />
        </View>

        <View
          renderIf={true}
          id="navigation-menu"
          className={cn('navbar-menu', {
            ['is-active']: toggleNavbar === true,
            ['cmp-landing-nav__items--hide']: toggleNavbar === true,
          })}
          flexGrow={1}
        >
          <View isRow className={cn('navbar-end', 'cmp-landing-nav__end')}>
            {renderNavListItems(listItems)}
          </View>
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

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onSignOut: () => dispatch(signOutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
