import type { NextPage } from 'next';
import Image from 'next/image';
import { connect } from 'react-redux';
import { IMAGES } from '../../app-config/images';
import { Button, Grid, LoadingCommon, Text, View, ViewItem } from '../../components/commons';
import LayoutFull from '../../layout/LayoutFull';
import { IRootState } from '../../redux/rootReducer';
import { FaDoorOpen } from 'react-icons/fa';
import { getMyProfileAction } from '../../redux/profile/profileSlice';
import { useComponentDidMount } from '../../hooks';
import { isEmpty } from '../../validations';
import { signOutAction } from '../../redux/auth/authSlice';
import { useRouter } from 'next/router';
import { PATHS } from '../../app-config/paths';

const Profile: NextPage<Props> = ({
  user,
  loading,
  myProfile,
  isAuthenticated,
  onGetMyProfile,
  onSignOut,
}) => {
  const router = useRouter();
  useComponentDidMount(() => {
    if (isEmpty(myProfile) && user) onGetMyProfile({ uid: user.uid });
  });

  const handleSignOut = () => {
    if (isAuthenticated) return onSignOut();
  };
  const handleEditProfile = () => {
    router.push(PATHS.editProfile);
  };
  return (
    <LayoutFull>
      <View flexGrow={1} className="p-profile">
        <View isRow>
          <h1 className="mr-24">My Profile</h1>
          {loading && <LoadingCommon />}
        </View>
        <View className="section-container mt-24">
          <h3>Avatar</h3>
          <View isRow className="mt-16" align="center">
            <Image
              className="p-profile__avatar"
              src={IMAGES.avatarPlaceholder}
              width={80}
              height={80}
              alt="Unset"
            />
            <Button label="Upload" className="mx-24" />
            <Button label="Remove" variant="outline-danger" />
          </View>
          <hr />
          <Grid.Wrap>
            <ViewItem label={'Display Name'} value={myProfile?.displayName} />
            <ViewItem label={'Full Name'} value={myProfile?.fullName} />
          </Grid.Wrap>
          <hr />
          <Grid.Wrap>
            <ViewItem label={'Phone Number'} value={myProfile?.phoneNumber} />
            <ViewItem label={'Email'} value={myProfile?.email} />
          </Grid.Wrap>
          <hr />
          <View isRow justify="space-between">
            <Button
              label="Log Out"
              variant="link-gray"
              icon={<FaDoorOpen size={24} />}
              onClick={handleSignOut}
            />

            <Button label="Edit" variant="outline" onClick={handleEditProfile} />
          </View>
        </View>
      </View>
    </LayoutFull>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  loading: state.profile.loading,
  user: state.auth.authUser,
  myProfile: state.profile.myProfile,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onGetMyProfile: (payload: { uid: string }) => dispatch(getMyProfileAction(payload)),
  onSignOut: () => dispatch(signOutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
