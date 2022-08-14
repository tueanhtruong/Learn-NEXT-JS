import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { View } from '@/components/commons';
import { IRootState } from '@/redux/rootReducer';

const LayoutWithSidebar: React.FC<Props> = ({ sidebar, body, footer }) => {
  const hasFooter = !!footer;

  return (
    <View className={cn('ctn-layout', 'container')} flexGrow={1}>
      <View className="ctn-layout__sidebar">{sidebar}</View>
      <View className={cn('ctn-layout__body', { 'has-footer': hasFooter })} flexGrow={1}>
        {body}
      </View>
      <View renderIf={hasFooter} className="ctn-layout__footer-fixed">
        {footer}
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    sidebar: ReactNode;
    footer: ReactNode;
    body: ReactNode;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutWithSidebar);
