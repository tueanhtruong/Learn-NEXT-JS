import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { IMAGES } from '../../app-config/images';
import { PATHS } from '../../app-config/paths';
import { Navigator } from '../../services';
import { Button, Image, Text, View } from '../commons';
import { ButtonVariant } from '../commons/Button';
import BurgerButton from './BurgerButton';

const NAV_TYPES = {
  isNavlink: 'NAV_LINK',
  isButton: 'BUTTON',
  isText: 'TEXT',
};

const Navbar: React.FC<Props> = ({
  user,
  //   showSecondBurger,
  isAuthenticated = false,
  //   showSidebar,
  //   onSignOut,
  //   onSetSidebar,
}) => {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const getUserName = () => {
    if (!user?.firstName) return 'Anonymous';
    return `${user.firstName} ${user.lastName}`;
  };

  // menu
  const navbarAuthItems = [
    {
      id: 'UserName',
      label: getUserName(),
      type: NAV_TYPES.isText,
    },

    {
      id: 'LogIn',
      label: 'Log out',
      type: NAV_TYPES.isText,
    },
  ];

  const navbarUnAuthItems = [
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
      //   case NAV_TYPES.isNavlink:
      //     return (
      //       <NavLink
      //         key={item.id}
      //         onClick={() => setToggleNavbar(!toggleNavbar)}
      //         className={"cmp-navbar__end--item cmp-navbar__end--item--link"
      //         to={item.href}
      //         label={item.label}
      //         activeClassName={"cmp-navbar__end--item--active"
      //       />
      //     );
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
          {/* <BurgerButton
            className={cn('cmp-navbar__sidebar-burger', { show: showSecondBurger })}
            target="sidebar-menu"
            isActive={showSidebar}
            onClick={() => onSetSidebar(!showSidebar)}
          /> */}

          <Link href={PATHS.root} passHref>
            <Image className={'justify-center cmp-navbar__logo'} src={IMAGES.logo} />
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

type Props = {
  user?: any;
  isAuthenticated?: boolean;
};

export default Navbar;
