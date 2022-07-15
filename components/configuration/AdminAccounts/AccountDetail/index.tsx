import { StarRateTwoTone } from '@material-ui/icons';
import type { NextPage } from 'next';
import { formatPhoneNumber } from 'react-phone-number-input';
import { connect } from 'react-redux';
import { setAdminProfileAction } from '../../../../redux/configuration/configurationSlice';
import { AdminAccount } from '../../../../redux/configuration/type';
import { setSelectedProfile, updateMyProfileAction } from '../../../../redux/profile/profileSlice';
import { Profile } from '../../../../redux/profile/type';
import { IRootState } from '../../../../redux/rootReducer';
import { Callback } from '../../../../redux/type';
import { Checkbox, Grid, LoadingCommon, Text, View, ViewItem } from '../../../commons';

const Configuration: NextPage<Props> = ({
  loading,
  data,
  user,
  onUpdateMyProfile,
  onSetSelectedProfile,
  onSetAdminProfile,
}) => {
  const handleCallbackCheckAdmin = (payload: Profile) => () => {
    onSetSelectedProfile(payload);
    const adminProfile: AdminAccount = {
      email: payload.email,
      isAdmin: payload.isAdmin,
      uid: payload.uid,
    };
    onSetAdminProfile(adminProfile);
  };
  const handleCheckAdmin = (event: any) => {
    const checked = event.target?.checked;
    if (data) {
      const payload: Profile = {
        ...data,
        isAdmin: checked,
      };
      return onUpdateMyProfile({
        payload,
        callback: handleCallbackCheckAdmin(payload),
        isAdminAction: true,
      });
    }
  };
  return (
    <View className="py-8">
      <Grid.Wrap>
        <ViewItem label={'Display Name'} value={data?.displayName} />
        <ViewItem label={'Full Name'} value={data?.fullName} />
        <ViewItem label={'Phone Number'} value={formatPhoneNumber(data?.phoneNumber ?? '')} />
        <ViewItem label={'Email'} value={data?.email} />
        <Grid.Item variant="is-full">
          <Checkbox.Item
            label={
              <View isRow align="center">
                <Text className="fw-bold mr-8">Is Admin</Text>
                {loading && <LoadingCommon />}
              </View>
            }
            checked={!!data?.isAdmin}
            onChange={handleCheckAdmin}
            disabled={user?.uid === data?.uid}
          />
        </Grid.Item>
      </Grid.Wrap>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {};
const mapStateToProps = (state: IRootState) => ({
  loading: state.profile.loading,
  user: state.auth.authUser,
  adminAccounts: state.configuration.admins,
  data: state.profile.selectedProfile,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onUpdateMyProfile: (payload: {
    payload: Profile;
    callback?: Callback | undefined;
    isAdminAction?: boolean;
  }) => dispatch(updateMyProfileAction(payload)),
  onSetSelectedProfile: (payload: Profile) => dispatch(setSelectedProfile(payload)),
  onSetAdminProfile: (payload: AdminAccount) => dispatch(setAdminProfileAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
