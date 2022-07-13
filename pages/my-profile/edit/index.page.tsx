import type { NextPage } from 'next';
import Image from 'next/image';
import { connect } from 'react-redux';
import { IMAGES } from '../../../app-config/images';
import {
  Button,
  Form,
  Grid,
  Input,
  InputPhone,
  LoadingCommon,
  View,
} from '../../../components/commons';
import LayoutFull from '../../../layout/LayoutFull';
import { IRootState } from '../../../redux/rootReducer';
import { getMyProfileAction, updateMyProfileAction } from '../../../redux/profile/profileSlice';
import { useComponentDidMount } from '../../../hooks';
import { isEmpty } from '../../../validations';
import { signOutAction } from '../../../redux/auth/authSlice';
import { useRef } from 'react';
import { Formik, FormikProps } from 'formik';
import { FormSchema, FormType, getInitialFormValue } from './helpers';
import { Profile } from '../../../redux/profile/type';
import { Callback } from '../../../redux/type';
import { useRouter } from 'next/router';
import { PATHS } from '../../../app-config/paths';
import { Toastify } from '../../../services';
import { showModal } from '../../../redux/modal/modalSlice';
import { ModalData, MODAL_TYPES } from '../../../redux/modal/type';
import UploadAvatar from '../../../components/UploadAvatar';
import { emptyFunction } from '../../../utils';

const Profile: NextPage<Props> = ({
  user,
  loading,
  myProfile,
  isAuthenticated,
  onShowModal,
  onGetMyProfile,
  onUpdateMyProfile,
}) => {
  const router = useRouter();
  const formRef = useRef<FormikProps<FormType>>(null);

  const handleShowUploadModal = () => {
    onShowModal({
      type: MODAL_TYPES.CONTENT_MODAL,
      data: {
        title: 'Upload Avatar Modal',
        content: <UploadAvatar onSave={emptyFunction} />,
      },
    });
  };

  useComponentDidMount(() => {
    if (isEmpty(myProfile) && user) onGetMyProfile({ uid: user.uid });
  });

  const handleSubmit = (value: FormType) => {
    onUpdateMyProfile({
      payload: value as Profile,
      callback: () => {
        Toastify.success('Update Profile successfully.');
        router.push(PATHS.myProfile);
      },
    });
  };

  return (
    <LayoutFull>
      <View flexGrow={1} className="p-profile">
        <View isRow>
          <h1 className="mr-24">Edit Profile</h1>
          {loading && <LoadingCommon />}
        </View>
        <View className="section-container mt-24">
          <Formik
            initialValues={getInitialFormValue(myProfile)}
            onSubmit={handleSubmit}
            innerRef={formRef}
            validationSchema={FormSchema}
            enableReinitialize
          >
            {({ errors, values, setFieldValue, getFieldProps, touched, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit} autoComplete="off">
                  <h3>Avatar</h3>
                  <View isRow className="mt-16" align="center">
                    <Image
                      className="p-profile__avatar"
                      src={IMAGES.avatarPlaceholder}
                      width={80}
                      height={80}
                      alt="Unset"
                    />
                    <Button
                      label="Upload"
                      className="mx-24"
                      onClick={handleShowUploadModal}
                      type="button"
                    />
                    <Button label="Remove" variant="outline-danger" type="button" />
                  </View>
                  <hr />
                  <Grid.Wrap>
                    <Grid.Item>
                      <Input
                        label={'Display Name'}
                        placeholder="Display Name"
                        errorMessage={touched?.displayName ? errors?.displayName : ''}
                        {...getFieldProps('displayName')}
                      />
                    </Grid.Item>
                    <Grid.Item>
                      <Input
                        label={'Full Name'}
                        placeholder="Full Name"
                        errorMessage={touched?.fullName ? errors?.fullName : ''}
                        {...getFieldProps('fullName')}
                      />
                    </Grid.Item>
                  </Grid.Wrap>
                  <hr />
                  <Grid.Wrap>
                    <Grid.Item>
                      <InputPhone
                        label={'Phone Number'}
                        placeholder="Phone Number"
                        errorMessage={touched?.phoneNumber ? errors?.phoneNumber : ''}
                        {...getFieldProps('phoneNumber')}
                        onChange={(value: any) => setFieldValue('phoneNumber', value)}
                      />
                    </Grid.Item>
                    <Grid.Item>
                      <Input
                        label={'Email'}
                        placeholder="Email"
                        errorMessage={touched?.email ? errors?.email : ''}
                        {...getFieldProps('email')}
                        disabled
                      />
                    </Grid.Item>
                  </Grid.Wrap>
                  <hr />
                  <View isRow justify="space-between">
                    <Button label="Cancel" variant="outline" type="button" />

                    <Button label="Save" type="submit" isLoading={loading} />
                  </View>
                </Form>
              );
            }}
          </Formik>
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
  onUpdateMyProfile: (payload: { payload: Profile; callback?: Callback | undefined }) =>
    dispatch(updateMyProfileAction(payload)),
  onShowModal: (payload: { data: ModalData; type: string }) => dispatch(showModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
