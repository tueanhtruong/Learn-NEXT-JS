/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiPaperclip } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';
import { useComponentDidMount } from '../../../hooks';
import { getDecodeUrlAction } from '../../../redux/file/fileSlice';
import { IRootState } from '../../../redux/rootReducer';
import { Callback } from '../../../redux/type';
import { FileCache } from '../../../services';
import { isURLImage } from '../../../utils';
import View from '../View';

const FileRenderer: React.FC<Props> = ({
  url,
  loading,
  onGetDecodeUrl,
  imageClassName,
  downloadFileName,
  label,
  labelClassName,
  isUpdateOnChange = false,
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
    }
  };

  const handleRemoveFile = () => {
    onRemove && onRemove(url);
  };

  const isImage = isURLImage(typeof url === 'string' ? decodeUrl : url?.type);

  if (!decodeUrl) return null;

  const allowRemove = !!onRemove;

  if (isImage)
    return (
      <View className="cmp-file-upload__image mb-2">
        <Image
          className={cn(
            'cmp-file-upload__image fit-image',
            { 'is-loading': false },
            imageClassName
          )}
          src={decodeUrl}
          alt="Unset"
          width={240}
          height={240}
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
  return null;
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
  };

const mapStateToProps = (state: IRootState) => ({
  loading: state.file.loading,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onGetDecodeUrl: (payload: { filePath: string | File; callback?: Callback | undefined }) =>
    dispatch(getDecodeUrlAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileRenderer);
