import { Formik, FormikProps } from 'formik';
import type { NextPage } from 'next';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { updateConfigurationBannerAction } from '@/redux/configuration/configurationSlice';
import { Banner } from '@/redux/configuration/type';
import { uploadFileAction } from '@/redux/file/fileSlice';
import { FileUploadType, GetPresignedPayload } from '@/redux/file/type';
import { hideModal } from '@/redux/modal/modalSlice';
import { IRootState } from '@/redux/rootReducer';
import { Toastify } from '@/services';
import {
  AttachmentUploadButton,
  Button,
  FileRenderer,
  Form,
  Grid,
  Input,
  InputMask,
  Text,
  TextArea,
  View,
} from '@/components/commons';
import { FormSchema, getInitialFormValue } from './helpers';

type FormType = Banner;

const Configuration: NextPage<Props> = ({
  loading,
  fileLoading,
  data,
  onCloseModal,
  onUpdateBanner,
  onUploadFile,
}) => {
  const formRef = useRef<FormikProps<FormType>>(null);
  const handleUpdateBanner = (value: FormType) => {
    onUpdateBanner(value);
  };
  const handleSubmit = (value: FormType) => {
    const file = value.image as File;
    if (typeof file === 'string') {
      handleUpdateBanner(value);
      return;
    }
    onUploadFile({
      contentType: file.type,
      fileName: file.name,
      fileData: file,
      type: FileUploadType.banner,
      callback: (url) => handleUpdateBanner({ ...value, image: url }),
    });
  };

  return (
    <View className="py-8">
      <Formik
        initialValues={getInitialFormValue(data)}
        onSubmit={handleSubmit}
        innerRef={formRef}
        validationSchema={FormSchema}
        enableReinitialize
      >
        {({
          errors,
          values,
          setFieldValue,
          getFieldProps,
          touched,
          handleSubmit,
          setFieldError,
        }) => {
          const handleError = (errorMessage: string | undefined) => {
            setFieldValue('image', '');
            setFieldError('image', errorMessage);
            Toastify.error(errorMessage);
          };
          const handleSetFile = (file: File[]) => {
            setFieldValue('image', file[0]);
          };
          return (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Grid.Wrap>
                <Grid.Item variant="is-full">
                  <Text size={14} className="fw-medium mb-8">
                    Banner Image *
                  </Text>
                  <View justify="center" align="center">
                    {values.image ? (
                      <FileRenderer
                        url={values.image}
                        onRemove={() => setFieldValue('image', '')}
                        isUpdateOnChange
                      />
                    ) : (
                      <AttachmentUploadButton
                        isBannerImage
                        filetype={FileUploadType.banner}
                        onAddAttachment={handleSetFile}
                        onError={handleError}
                      />
                    )}
                    <Text className="has-text-danger mt-16">{errors.image}</Text>
                  </View>
                </Grid.Item>
                <Grid.Item>
                  <InputMask
                    mask="9999999999999999999"
                    label={'Order *'}
                    placeholder="Order"
                    errorMessage={touched?.order ? errors?.order : ''}
                    maskChar={null}
                    {...getFieldProps('order')}
                  />
                </Grid.Item>
                <Grid.Item>
                  <Input
                    label={'Label *'}
                    placeholder="Label"
                    errorMessage={touched?.label ? errors?.label : ''}
                    {...getFieldProps('label')}
                  />
                </Grid.Item>
                <Grid.Item variant="is-full">
                  <TextArea
                    label={'Description *'}
                    placeholder="Description"
                    errorMessage={touched?.description ? errors?.description : ''}
                    {...getFieldProps('description')}
                  />
                </Grid.Item>
              </Grid.Wrap>
              <View isRow justify="space-between">
                <Button
                  label="Cancel"
                  variant="outline"
                  type="button"
                  onClick={() => onCloseModal()}
                />

                <Button label="Save" type="submit" isLoading={loading || fileLoading} />
              </View>
            </Form>
          );
        }}
      </Formik>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {};
const mapStateToProps = (state: IRootState) => ({
  fileLoading: state.file.loading,
  loading: state.configuration.loading,
  user: state.auth.authUser,
  data: state.configuration.selectedBanner,
});

const mapDispatchToProps = (dispatch: (_arg0: { payload: any; type: string }) => any) => ({
  onUpdateBanner: (payload: Banner) => dispatch(updateConfigurationBannerAction(payload)),
  onCloseModal: () => dispatch(hideModal()),
  onUploadFile: (payload: GetPresignedPayload) => dispatch(uploadFileAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
