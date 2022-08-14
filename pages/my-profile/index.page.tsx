import type { NextPage } from 'next';
import { connect } from 'react-redux';
import { Button, FileRenderer, Grid, LoadingCommon, View, ViewItem } from '@/components/commons';
import LayoutFull from '@/layout/LayoutFull';
import { IRootState } from '@/redux/rootReducer';
import { FaDoorOpen } from 'react-icons/fa';
import { getMyProfileAction, updateMyProfileAction } from '@/redux/profile/profileSlice';
import { signOutAction } from '@/redux/auth/authSlice';
import { useRouter } from 'next/router';
import { PATHS } from '@/app-config/paths';
import { ModalData, MODAL_TYPES } from '@/redux/modal/type';
import UploadAvatar from '@/components/UploadAvatar';
import { showModal } from '@/redux/modal/modalSlice';
import { Profile } from '@/redux/profile/type';
import { Callback } from '@/redux/type';
import { formatPhoneNumber } from 'react-phone-number-input';

const ProfileDetail: NextPage<Props> = ({
  loading,
  myProfile,
  isAuthenticated,
  onSignOut,
  onShowModal,
  onUpdateMyProfile,
}) => {
  const router = useRouter();
  const handleSignOut = () => {
    if (isAuthenticated) return onSignOut();
  };
  const handleEditProfile = () => {
    router.push(PATHS.editProfile);
  };

  const handleShowUploadModal = () => {
    onShowModal({
      type: MODAL_TYPES.CONTENT_MODAL,
      data: {
        title: 'Upload Avatar',
        content: <UploadAvatar onSave={handleSaveAvatar} fileUrl={myProfile?.avatar} />,
      },
    });
  };

  const handleSaveAvatar = (url: string) => {
    onUpdateMyProfile({
      payload: {
        ...myProfile,
        avatar: url,
      } as Profile,
    });
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
            <View className="mr-24">
              <FileRenderer
                url={myProfile?.avatar ?? ''}
                imgHeight={80}
                imgWidth={80}
                imageClassName="p-profile__avatar"
                isAvatar
                isUpdateOnChange
              />
            </View>
            <View isRow>
              <Button label="Upload" className="mr-24" onClick={handleShowUploadModal} />
              <Button label="Remove" variant="link-gray" onClick={() => handleSaveAvatar('')} />
            </View>
          </View>
          <hr />
          <Grid.Wrap>
            <ViewItem label={'Display Name'} value={myProfile?.displayName} />
            <ViewItem label={'Full Name'} value={myProfile?.fullName} />
          </Grid.Wrap>
          <hr />
          <Grid.Wrap>
            <ViewItem
              label={'Phone Number'}
              value={formatPhoneNumber(myProfile?.phoneNumber ?? '')}
            />
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

const mapDispatchToProps = (dispatch: (_arg0: { payload: any; type: string }) => any) => ({
  onGetMyProfile: (payload: { uid: string }) => dispatch(getMyProfileAction(payload)),
  onSignOut: () => dispatch(signOutAction()),
  onShowModal: (payload: { data: ModalData; type: string }) => dispatch(showModal(payload)),
  onUpdateMyProfile: (payload: { payload: Profile; callback?: Callback | undefined }) =>
    dispatch(updateMyProfileAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
