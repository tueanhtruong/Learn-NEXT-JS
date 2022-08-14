import React, { HTMLProps } from 'react';
import cn from 'classnames';
import { View } from '../../commons';
import { Callback } from '@/redux/type';

export type ItemSidebar = {
  label: string;
  tab: string;
  icon?: React.ReactElement;
};

const Sidebar: React.FC<Props> = ({ items, setTab, tab }) => {
  return (
    <View className={cn('cmp-config-sidebar')}>
      {items.map((item, index) => {
        const isActive = tab === item.tab;
        return (
          <View
            key={`config-sidebar-item-${index}`}
            className={cn('cmp-config-sidebar__item', { 'is-active': isActive })}
            onClick={() => setTab(item.tab)}
            isRow
            align="center"
            justify="flex-start"
          >
            <View>{item.icon ?? null}</View>
            <View>{item.label}</View>
          </View>
        );
      })}
    </View>
  );
};

type Props = HTMLProps<HTMLDivElement> & {
  items: ItemSidebar[];
  tab: string;
  setTab: Callback;
};

export default Sidebar;
