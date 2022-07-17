/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { FiPaperclip } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';
import { IMAGES } from '../../../app-config/images';
import { useComponentDidMount } from '../../../hooks';
import { getDecodeUrlAction } from '../../../redux/file/fileSlice';
import { IRootState } from '../../../redux/rootReducer';
import { Callback } from '../../../redux/type';
import { FileCache } from '../../../services';
import { isURLImage } from '../../../utils';
import View from '../View';

type PlaceholderProps = {
  imgWidth: string;
  imgHeight: string;
};

const Placeholder = ({ imgHeight, imgWidth }: PlaceholderProps) => {
  return (
    <View style={{ minHeight: imgHeight, minWidth: imgWidth }}>
      <ContentLoader
        viewBox={`0 0 ${imgWidth} ${imgHeight}`}
        backgroundColor="rgba(97, 97, 97, 0.2)"
        speed={2}
      >
        <rect x="0" y="0" rx="0" ry="0" width={imgWidth} height={imgHeight} />
      </ContentLoader>
    </View>
  );
};

const FileRenderer: React.FC<Props> = ({
  url,
  loading,
  onGetDecodeUrl,
  imageClassName,
  downloadFileName,
  label,
  labelClassName,
  isUpdateOnChange = false,
  isAvatar,
  imgHeight = 240,
  imgWidth = 240,
  onRemove,
}) => {
  const [decodeUrl, setDecodeUrl] = useState('');
  useComponentDidMount(() => {
    handleDecodeUrl();
  });

  useEffect(() => {
    if (isUpdateOnChange && url) handleDecodeUrl();
  }, [url]);

  const handleDecodeUrl = () => {
    if (url) {
      if (typeof url === 'string') {
        const decodeUrl = FileCache.getCachedUrl(url);
        if (!decodeUrl) {
          onGetDecodeUrl({
            filePath: url,
            callback: (res) => {
              FileCache.saveCacheUrl(url, res);
              setDecodeUrl(res);
            },
          });
        } else {
          setDecodeUrl(decodeUrl);
        }
      } else {
        const decodeUrl = URL.createObjectURL(url);
        setDecodeUrl(decodeUrl);
      }
    } else {
      return decodeUrl ? setDecodeUrl('') : null;
    }
  };

  const handleRemoveFile = () => {
    onRemove && onRemove(url);
  };

  const isImage = isURLImage(typeof url === 'string' ? decodeUrl : url?.type);

  if (!decodeUrl) {
    if (isAvatar)
      return (
        <Image
          className="p-profile__avatar"
          src={IMAGES.avatarPlaceholder}
          width={80}
          height={80}
          alt="Unset"
        />
      );
    return <Placeholder imgHeight={`${imgHeight}`} imgWidth={`${imgWidth}`} />;
  }

  const allowRemove = !!onRemove;

  if (isImage)
    return (
      <View className={cn('cmp-file-upload__image')}>
        {/* <Placeholder imgHeight={`${imgHeight}`} imgWidth={`${imgWidth}`} /> */}
        <Image
          className={cn(
            'cmp-file-upload__image fit-image',
            { 'is-loading': false },
            imageClassName
          )}
          src={decodeUrl}
          alt="Unset"
          width={imgWidth}
          height={imgHeight}
        />
        {allowRemove && (
          <IoClose
            onClick={handleRemoveFile}
            title={'Remove file'}
            className="cmp-file-upload__image-close"
          />
        )}
      </View>
    );

  if (label) {
    return (
      <View isRow align="center" className="mb-1">
        <a
          href={decodeUrl}
          download={downloadFileName}
          target="_blank"
          className={cn('cmp-file-upload__name', labelClassName)}
          rel="noreferrer"
        >
          {label}
        </a>
        {allowRemove && (
          <IoClose className={cn('cmp-file-upload__icon--trash')} onClick={handleRemoveFile} />
        )}
      </View>
    );
  }

  if (downloadFileName) {
    return (
      <View isRow align="center" className="mb-1">
        <FiPaperclip className={cn('cmp-file-upload__icon mr-1')} />
        <a
          href={decodeUrl}
          download={downloadFileName}
          target="_blank"
          className={cn('cmp-file-upload__name')}
          rel="noreferrer"
        >
          {downloadFileName ||
            FileCache.trimUuidFromUniqueId(FileCache.getUniqueIdFromUrl(decodeUrl) ?? '')}
        </a>
        {allowRemove && (
          <IoClose className={cn('cmp-file-upload__icon--trash')} onClick={handleRemoveFile} />
        )}
      </View>
    );
  }
  return <Placeholder imgHeight={`${imgHeight}`} imgWidth={`${imgWidth}`} />;
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    url: string | File;
    downloadFileName?: string;
    label?: string;
    labelClassName?: string;
    onRemove?: Callback;
    imageClassName?: string;
    isUpdateOnChange?: boolean;
    isAvatar?: boolean;
    imgWidth?: number;
    imgHeight?: number;
  };

const mapStateToProps = (state: IRootState) => ({
  loading: state.file.loading,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onGetDecodeUrl: (payload: { filePath: string | File; callback?: Callback | undefined }) =>
    dispatch(getDecodeUrlAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileRenderer);
