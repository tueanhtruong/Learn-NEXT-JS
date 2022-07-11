import React from 'react';
import { connect } from 'react-redux';
import { View } from '../../components/commons';
import { IRootState } from '../../redux/rootReducer';

const LayoutFull: React.FC<Props> = ({ children }) => {
  return <View className="secondary-container ctn-layout-full">{children}</View>;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { children: any };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutFull);
