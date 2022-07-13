import { connect } from 'react-redux';
import { hideModal } from '../../redux/modal/modalSlice';
import { IRootState } from '../../redux/rootReducer';
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { Text, View } from '../commons';
import { isEmpty } from '../../validations';
import { GrClose } from 'react-icons/gr';
import { MODAL_TYPES } from '../../redux/modal/type';
import OkModal from './OkModal';
import YesNoModal from './YesNoModal';
const ModalContainer: React.FC<Props> = ({
  startClosing,
  data,
  isVisible,
  modalType,
  onHideModal,
}) => {
  const { hideCloseButton, allowCloseByEsc, overflowVisible, title, content, footer } = data;

  if (!isVisible) return null;

  const hideTitle = !title;

  return (
    <MuiDialog
      onClose={onHideModal}
      open={true}
      //   {...dialogProps}
      //   fullScreen={fullScreen}
      //   disableBackdropClick={loading || disabledButton}
      classes={{ paper: overflowVisible ? 'cmp-dialog cmp-dialog-content-visible' : 'cmp-dialog' }}
    >
      {!hideTitle && (
        <DialogTitle className="cmp-dialog-title" disableTypography>
          <View isRow justify="space-between" align="center">
            <Text size={18} className="fw-bold mr-8">
              {isEmpty(title) ? ` ` : title}
            </Text>
            <IconButton className="cmp-dialog-close-icon" onClick={onHideModal}>
              <GrClose size={16} />
            </IconButton>
          </View>
        </DialogTitle>
      )}
      <DialogContent
        classes={{
          root: overflowVisible
            ? 'cmp-dialog-content cmp-dialog-content-visible'
            : 'cmp-dialog-content',
        }}
      >
        {ModalBody({ modalType, content })}
      </DialogContent>
      <DialogActions className="cmp-dialog-footer">{footer}</DialogActions>
    </MuiDialog>
  );
};

const ModalBody = ({ modalType, content }: { modalType: string; content: any }) => {
  switch (modalType) {
    case MODAL_TYPES.OK_MODAL:
      return <OkModal />;
    case MODAL_TYPES.YES_NO_MODAL:
      return <YesNoModal />;
    case MODAL_TYPES.CONTENT_MODAL:
      return content;
    default:
      return <OkModal />;
  }
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {};

const mapStateToProps = (state: IRootState) => ({
  isVisible: state.modal.isVisible,
  modalType: state.modal.type,
  startClosing: state.modal.startClosing,
  data: state.modal.data,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onHideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
