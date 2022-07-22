import type { NextPage } from 'next';
import { connect } from 'react-redux';
import { Grid, LoadingCommon, View, ViewItem } from '../../components/commons';
import { IRootState } from '../../redux/rootReducer';

const Shopping: NextPage<Props> = ({ user, loading }) => {
  return (
    <View className="c-container">
      <h1>Welcome to Shopping Page</h1>
      {loading ? (
        <View align="center">
          <LoadingCommon />
        </View>
      ) : (
        <Grid.Wrap>
          <ViewItem label={'Name'} value={user?.name} />
          <ViewItem label={'Email'} value={user?.email} />
          <ViewItem label={'Avatar'} value={user?.image} />
        </Grid.Wrap>
      )}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  loading: state.auth.loading,
  user: state.auth.authUser,
});

const mapDispatchToProps = (_dispatch: (_arg0: { payload: any; type: string }) => any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Shopping);
