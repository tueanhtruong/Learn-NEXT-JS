import { Formik, FormikProps } from 'formik';
import type { NextPage } from 'next';
import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';

import { uploadFilesAction } from '../../../../redux/file/fileSlice';
import {
  FileUploadType,
  GetMultiPresignedPayload,
  GetPresignedPayload,
} from '../../../../redux/file/type';
import { hideModal } from '../../../../redux/modal/modalSlice';
import { IRootState } from '../../../../redux/rootReducer';
import { updateShopItemAction } from '../../../../redux/shop/shopSlice';
import { Item } from '../../../../redux/shop/type';
import { Callback } from '../../../../redux/type';
import { Toastify } from '../../../../services';
import { getRandomId } from '../../../../utils';
import {
  AttachmentUploadButton,
  Button,
  FileRenderer,
  Form,
  Grid,
  Input,
  InputMoney,
  Text,
  TextArea,
  View,
} from '../../../commons';
import { FormSchema, getInitialFormValue } from './helpers';

type FormType = Item;

const renderButtonAddNew = (onClick: Callback) => (
  <View align="flex-start">
    <Button
      label="Add a new Product Image"
      variant="link-gray"
      type="button"
      icon={<FaPlus />}
      onClick={onClick}
    />
  </View>
);

const Shop: NextPage<Props> = ({
  loading,
  fileLoading,
  data,
  onCloseModal,
  onUpdateItem,
  onUploadFiles,
}) => {
  const formRef = useRef<FormikProps<FormType>>(null);
  const handleUpdateItem = (value: FormType) => {
    onUpdateItem(value);
  };
  const handleSubmit = (value: FormType) => {
    // console.log('value: ', value);
    const imageKeys = Object.keys(value.images);
    const imageValues = Object.values(value.images);
    const filesPayload: GetPresignedPayload[] = imageValues.map(
      (value, idx): GetPresignedPayload => {
        if (typeof value === 'string')
          return {
            url: value,
            // eslint-disable-next-line security/detect-object-injection
            keyId: imageKeys[idx],
          };
        return {
          contentType: value?.type ?? '',
          fileName: value?.name,
          fileData: value,
          type: FileUploadType.shop,
          keepOriginalQuality: true,
          // eslint-disable-next-line security/detect-object-injection
          keyId: imageKeys[idx],
        };
      }
    );

    onUploadFiles({
      files: filesPayload,
      callback: (images) => handleUpdateItem({ ...value, images }),
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
            const newFile = file[0];
            const randomId = getRandomId();
            const newImages = { ...values.images, [randomId]: newFile };
            setFieldValue('images', newImages);
          };
          const handleRemoveFile = (key: string) => {
            const newImages = { ...values.images };
            // eslint-disable-next-line security/detect-object-injection
            delete newImages?.[key];
            setFieldValue('images', newImages);
          };
          const imageKeys = Object.keys(values.images);
          return (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Grid.Wrap>
                <Grid.Item variant="is-full">
                  <Text size={14} className="fw-medium mb-8">
                    Product Image *
                  </Text>
                  {imageKeys.map((item) => {
                    return (
                      <View
                        key={item}
                        style={{ maxHeight: 244, overflow: 'hidden', marginBottom: 12 }}
                      >
                        <FileRenderer
                          // eslint-disable-next-line security/detect-object-injection
                          url={values.images?.[item]}
                          onRemove={() => handleRemoveFile(item)}
                          imgHeight={244}
                          imgWidth={244}
                        />
                      </View>
                    );
                  })}

                  <AttachmentUploadButton
                    isBannerImage
                    filetype={FileUploadType.banner}
                    onAddAttachment={handleSetFile}
                    onError={handleError}
                    buttonLabel={renderButtonAddNew}
                  />
                </Grid.Item>

                <Grid.Item variant="is-full">
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
                <Grid.Item variant="is-full">
                  <InputMoney
                    label={'Price *'}
                    placeholder="Price"
                    errorMessage={touched?.price ? errors?.price : ''}
                    {...getFieldProps('price')}
                    onChange={setFieldValue}
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
  loading: state.shop.loading,
  user: state.auth.authUser,
  data: state.shop.selectedItem,
});

const mapDispatchToProps = (dispatch: (_arg0: { payload: any; type: string }) => any) => ({
  onUpdateItem: (payload: Item) => dispatch(updateShopItemAction(payload)),
  onCloseModal: () => dispatch(hideModal()),
  onUploadFiles: (payload: GetMultiPresignedPayload) => dispatch(uploadFilesAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
