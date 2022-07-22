import { connect } from 'react-redux';
import { Button, Text, View } from '../../commons';
import { IRootState } from '../../../redux/rootReducer';
import { hideModal } from '../../../redux/modal/modalSlice';
import React from 'react';

const OkModal: React.FC<Props> = ({ modalData }) => {
  const { title, message, okText, onOk = () => {} } = modalData;
  const handleOk = (event: any) => {
    onOk(event);
  };
  return (
    <View className={`ctn-modal__content`}>
      <View flexGrow={1}>
        {title && (
          <Text size={20} className="mb-4 ctn-modal__content__title">
            {title}
          </Text>
        )}
        {message && <Text className="mb-5 ctn-modal__content__message">{message}</Text>}
      </View>
      <View isRow justify="flex-end" className="ctn-modal__content__footer">
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

export default connect(mapStateToProps, mapDispatchToProps)(OkModal);
