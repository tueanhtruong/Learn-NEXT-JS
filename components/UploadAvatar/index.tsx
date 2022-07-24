import { Formik, FormikProps } from 'formik';
import type { NextPage } from 'next';
import { useRef } from 'react';
import { connect } from 'react-redux';
import {
  AttachmentUploadButton,
  Button,
  FileRenderer,
  Form,
  Text,
  View,
} from '../../components/commons';
import { uploadFileAction } from '../../redux/file/fileSlice';
import { FileUploadType, GetPresignedPayload } from '../../redux/file/type';
import { hideModal } from '../../redux/modal/modalSlice';
import { IRootState } from '../../redux/rootReducer';
import { Callback } from '../../redux/type';
import { Toastify, Yup } from '../../services';

type FormType = {
  file: string | File;
};

const FormSchema = Yup.object().shape({
  file: Yup.mixed().required(),
});

const UploadModal: NextPage<Props> = ({ loading, onSave, fileUrl, onHideModal, onUploadFile }) => {
  const formRef = useRef<FormikProps<FormType>>(null);
  const initialData: FormType = {
    file: fileUrl ?? '',
  };

  const handleSubmit = (value: FormType) => {
    if (typeof value.file === 'string') return onHideModal();
    const file = value.file as File;
    const payload: GetPresignedPayload = {
      contentType: file?.type ?? '',
      fileName: file?.name,
      fileData: file,
      type: FileUploadType.avatar,
      callback: (url) => {
        onSave(url);
        onHideModal();
      },
    };
    return onUploadFile(payload);
  };

  return (
    <View className="medium-form-container">
      <Text>You can upload a JPG, GIF or PNG file. Maximum file size is 16 MB.</Text>
      <Formik
        initialValues={initialData}
        onSubmit={handleSubmit}
        innerRef={formRef}
        validationSchema={FormSchema}
        enableReinitialize
      >
        {({ errors, values, setFieldValue, setFieldError, handleSubmit }) => {
          const handleError = (errorMessage: string | undefined) => {
            setFieldValue('file', '');
            setFieldError('file', errorMessage);
            Toastify.error(errorMessage);
          };
          const handleSetFile = (file: File[]) => {
            setFieldValue('file', file[0]);
          };
          return (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <View flexGrow={1} align="center" className="mt-16 mb-32">
                <Text className="has-text-danger mb-16">{errors.file}</Text>
                {values.file ? (
                  <FileRenderer
                    url={values.file}
                    onRemove={() => setFieldValue('file', '')}
                    isUpdateOnChange
                  />
                ) : (
                  <AttachmentUploadButton
                    filetype={FileUploadType.avatar}
                    onAddAttachment={handleSetFile}
                    onError={handleError}
                  />
                )}
              </View>
              <View isRow justify="flex-end" className="mt-16">
                <Button
                  label="Cancel"
                  variant="outline"
                  className="mr-16"
                  type="button"
                  onClick={onHideModal}
                />
                <Button label="Save" type="submit" isLoading={loading} />
              </View>
            </Form>
          );
        }}
      </Formik>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    onSave: Callback;
    fileUrl?: string;
  };
const mapStateToProps = (state: IRootState) => ({
  loading: state.file.loading,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onUploadFile: (payload: GetPresignedPayload) => dispatch(uploadFileAction(payload)),
  onHideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);
