import type { NextPage } from 'next';
import { connect } from 'react-redux';
import { IRootState } from '../../../redux/rootReducer';
import { View } from '../../commons';

const Configuration: NextPage<Props> = ({ user, loading }) => {
  return (
    <View className="section-container">
      <h3>Admin Accounts</h3>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  loading: state.auth.loading,
  user: state.auth.authUser,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
