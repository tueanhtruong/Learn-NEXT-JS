import type { NextPage } from 'next';
import { formatPhoneNumber } from 'react-phone-number-input';
import { connect } from 'react-redux';
import { Profile } from '../../../../redux/profile/type';
import { IRootState } from '../../../../redux/rootReducer';
import { Checkbox, Grid, LoadingCommon, Text, View, ViewItem } from '../../../commons';

const Configuration: NextPage<Props> = ({ loading, data }) => {
  const handleCheckAdmin = (event: any) => {
    const checked = event.target?.checked;
  };
  return (
    <View className="py-8">
      <Grid.Wrap>
        <ViewItem label={'Display Name'} value={data.displayName} />
        <ViewItem label={'Full Name'} value={data.fullName} />
        <ViewItem label={'Phone Number'} value={formatPhoneNumber(data.phoneNumber)} />
        <ViewItem label={'Email'} value={data.email} />
        <Grid.Item variant="is-full">
          <Checkbox.Item
            label={
              <View isRow align="center">
                <Text className="fw-bold mr-8">Is Admin</Text>
                {loading && <LoadingCommon />}
              </View>
            }
            checked={!!data.isAdmin}
            onChange={handleCheckAdmin}
          />
        </Grid.Item>
      </Grid.Wrap>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    data: Profile;
  };
const mapStateToProps = (state: IRootState) => ({
  loading: state.profile.loading,
  user: state.auth.authUser,
  adminAccounts: state.configuration.admins,
  userProfiles: state.profile.userProfiles,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
