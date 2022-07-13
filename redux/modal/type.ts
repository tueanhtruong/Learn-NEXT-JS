export interface OkModalData {
  title?: string | React.ReactNode;
  message?: string;
  okText?: string;
  onOk?: (...arg: any[]) => void;
}

export interface YesNoModalData {
  title?: string | React.ReactNode;
  message?: string;
  okText?: string;
  cancelText?: string;
  onCancel?: (...arg: any[]) => void;
  onOk?: (...arg: any[]) => void;
}

export interface ContentModalData {
  content?: React.ReactNode;
  hideCloseButton?: boolean;
  allowCloseByEsc?: boolean;
  overflowVisible?: boolean;
}

export type ModalData = OkModalData &
  YesNoModalData &
  ContentModalData & {
    footer?: React.ReactNode;
  };

export enum MODAL_TYPES {
  OK_MODAL = 'OK_MODAL',
  YES_NO_MODAL = 'YES_NO_MODAL',
  EMAIL_CONFIRMATION_MODAL = 'EMAIL_CONFIRMATION_MODAL',
  CONTENT_MODAL = 'CONTENT_MODAL',
  MFA_CONFIRMATION_MODAL = 'MFA_CONFIRMATION_MODAL',
}
