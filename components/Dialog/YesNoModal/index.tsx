import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../redux/modal/modalSlice';
import { IRootState } from '../../../redux/rootReducer';
import { Button, Text, View } from '../../commons';

const YesNoModal: React.FC<Props> = ({ modalData }) => {
  const { title, message, okText, cancelText, onOk = () => {}, onCancel = () => {} } = modalData;

  const handleOk = (event: any) => {
    onOk(event);
  };
  const handleCancel = (event: any) => {
    onCancel(event);
  };

  return (
    <View className={`ctn-modal__content normal-form-container`}>
      <View>
        {title && (
          <Text size={20} className="mb-4 ctn-modal__content__title">
            {title}
          </Text>
        )}
        {message && <Text className="mb-5 ctn-modal__content__message">{message}</Text>}
      </View>
      <View isRow justify="flex-end" className="ctn-modal__content__footer">
        <Button onClick={handleCancel} variant="secondary-outline" className="mr-3">
          {cancelText || 'Cancel'}
        </Button>
        <Button onClick={handleOk}>{okText || 'OK'}</Button>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {};

const mapStateToProps = (state: IRootState) => ({
  modalData: state.modal.data,
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onHideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(YesNoModal);
