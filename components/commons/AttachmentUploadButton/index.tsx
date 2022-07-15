import Image from 'next/image';
import React, { ReactElement, useRef } from 'react';
import { FiCamera } from 'react-icons/fi';
import { connect } from 'react-redux';
import { IMAGES } from '../../../app-config/images';
import { getDecodeUrlAction } from '../../../redux/file/fileSlice';
import { FileUploadType } from '../../../redux/file/type';
import { IRootState } from '../../../redux/rootReducer';
import { Callback } from '../../../redux/type';
import FileUpload from '../FileUpload';
import View from '../View';
import cn from 'classnames';

const AttachmentUploadButton: React.FC<Props> = ({
  filetype = 'avatars',
  icon,
  content = 'upload',
  onAddAttachment,
  isAvatar = true,
  isBannerImage = false,
  onError,
}) => {
  const inputRef = useRef<HTMLInputElement>();

  const handleOpenSelectFileModal = (event: any) => {
    event.stopPropagation();
    if (inputRef.current) inputRef.current?.click();
  };

  const handleSelectFile = (files: File[]) => {
    onAddAttachment(files);
  };

  return (
    <View className={cn('cmp-upload-button')}>
      <Image
        className={cn('cmp-upload-button__image')}
        src={isBannerImage ? IMAGES.imgPlaceholder : IMAGES.avatarPlaceholder}
        width={184}
        height={184}
        alt="Unset"
        onClick={handleOpenSelectFileModal}
      />
      <View className="cmp-upload-button__icon" onClick={handleOpenSelectFileModal}>
        <View>
          <FiCamera size={26} className="cmp-upload-button__icon--cam" />
        </View>
      </View>
      <FileUpload
        className="is-hidden"
        onChange={handleSelectFile}
        innerRef={inputRef}
        isAvatar={isAvatar}
        onError={(errorMessage: any) => onError(errorMessage)}
      />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    filetype: FileUploadType;
    icon?: ReactElement;
    content?: string;
    onAddAttachment: Callback;
    isAvatar?: boolean;
    isBannerImage?: boolean;
    onError: (value: any) => void;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onGetDecodeUrl: (payload: { filePath: string | File; callback?: Callback | undefined }) =>
    dispatch(getDecodeUrlAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentUploadButton);
