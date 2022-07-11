import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { IMAGES } from '../../app-config/images';
import { PATHS } from '../../app-config/paths';
import { IRootState } from '../../redux/rootReducer';
import { Button, Text, View } from '../commons';
import { ButtonVariant } from '../commons/Button';
import BurgerButton from './BurgerButton';
import { signOut } from 'next-auth/react';
import { signOutAction } from '../../redux/auth/authSlice';
import Image from 'next/image';

const NAV_TYPES = {
  isNavlink: 'NAV_LINK',
  isButton: 'BUTTON',
  isText: 'TEXT',
};

const Navbar: React.FC<Props> = ({ user, isAuthenticated = false, onSignOut }) => {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const getUserName = () => {
    if (!user?.name) return 'Anonymous';
    return `${user.name}`;
  };

  const handleSignOut = () => {
    if (user?.emailPasswordAuthentication) return onSignOut();
    return signOut();
  };

  // menu
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
    {
      id: 'LogIn',
      label: 'Log out',
      type: NAV_TYPES.isText,
      onClick: () => handleSignOut(),
    },
  ];

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

  const renderNavItems = (item: any) => {
    switch (item.type) {
      case NAV_TYPES.isNavlink:
        return (
          <Link
            href={item.href}
            key={item.id}
            // onClick={() => setToggleNavbar(!toggleNavbar)}
            // className={"cmp-navbar__end--item cmp-navbar__end--item--link"}
            // to={item.href}
            // label={item.label}
            // activeClassName={"cmp-navbar__end--item--active"}
          >
            <a
              onClick={() => setToggleNavbar(!toggleNavbar)}
              className={'cmp-navbar__end--item cmp-navbar__end--item--link'}
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
            className={cn('cmp-navbar__end--button')}
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
            className={cn('cmp-navbar__end--item', {
              ['cmp-navbar__end--item--link']: !!item.onClick,
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
      className={cn('cmp-navbar', 'navbar', 'jump-down')}
      ref={navbarRef}
      role="navigation"
      aria-label="main navigation"
    >
      <View className={cn('cmp-navbar__container', 'c-container')}>
        <View isRow flexGrow={1} className={cn('cmp-navbar__branch', 'navbar-brand')}>
          <Link href={PATHS.root} passHref>
            <a>
              <Image
                className={'justify-center cmp-navbar__logo'}
                src={IMAGES.logoCode}
                alt="Unset"
                width={54}
                height={54}
              />
            </a>
          </Link>

          <BurgerButton
            className={'cmp-navbar__burger'}
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
            ['cmp-navbar__items--hide']: toggleNavbar === true,
          })}
          flexGrow={1}
        >
          <View isRow className={cn('navbar-end', 'cmp-navbar__end')}>
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
  isAuthenticated: state.auth?.isAuthenticated,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onSignOut: () => dispatch(signOutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

// export default Navbar;
