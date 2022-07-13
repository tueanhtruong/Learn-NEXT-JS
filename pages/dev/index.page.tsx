import type { NextPage } from 'next';
import {
  Button,
  FileRenderer,
  FileUpload,
  Grid,
  LoadingCommon,
  Text,
  View,
} from '../../components/commons';
import Input from '../../components/commons/Input';
import { connect } from 'react-redux';
import {
  decrementValue,
  getTodoListAction,
  incrementValue,
} from '../../redux/content/contentSlice';
import { IRootState } from '../../redux/rootReducer';
import { useState } from 'react';
import { FileUploadType, GetPresignedPayload } from '../../redux/file/type';
import { getDecodeUrlAction, uploadFileAction } from '../../redux/file/fileSlice';
// import { getRandomId } from '../../utils';
import { Callback } from '../../redux/type';
import Image from 'next/image';

const tempUrl = 'proof_of_identity/anne-sophie-benoit-Fan_HlAfpu0-unsplash.jpg';

const Home: NextPage<Props> = ({
  value,
  todoList,
  loading,
  fileLoading,
  onIncrementValue,
  onDecrementValue,
  onGetTodoList,
  onUploadFile,
  onGetDecodeUrl,
}) => {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState('');
  const [decodeUrl, setDecodeUrl] = useState('');

  const handleUploadFile = () => {
    const fileName = `${FileUploadType.proof_of_identity}/${file?.name}`;
    const payload: GetPresignedPayload = {
      contentType: file?.type ?? '',
      fileName,
      fileData: file,
      type: FileUploadType.proof_of_identity,
      callback: (url) => {
        setUrl(url);
      },
    };
    return onUploadFile(payload);
  };
  const handleGetDecodeUrl = () => {
    const payload = {
      filePath: url || tempUrl,
      callback: (url: string) => {
        setDecodeUrl(url);
      },
    };
    return onGetDecodeUrl(payload);
  };

  return (
    <View className="c-container">
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a> Development Center
      </h1>
      <Text size={24} className="my-12">
        Button value {value}
      </Text>
      <View isRow className="mb-16">
        <Button label="Get Todo List" className="mr-16" onClick={onGetTodoList} />
        <Button label="Increase" className="mr-16" onClick={onIncrementValue} />
        <Button label="Decrease" variant="outline" onClick={onDecrementValue} />
      </View>
      <View isRow>
        <Text size={24} className="my-12 mr-16">
          Todo List {todoList.length}
        </Text>
        {loading && <LoadingCommon />}
      </View>
      <View isRow className="mb-16">
        <Button label="Get Todo List" className="mr-16" onClick={onGetTodoList} />
        <Button
          label="Upload File"
          disabled={!file}
          className="mr-16"
          onClick={handleUploadFile}
          isLoading={fileLoading}
        />
        <Button
          label="Get File Image"
          disabled={!tempUrl}
          className="mr-16"
          onClick={handleGetDecodeUrl}
          isLoading={fileLoading}
        />
      </View>
      <Grid.Wrap>
        <Grid.Item variant="is-full">
          Upload Url: {url}
          <FileUpload
            onChange={(value) => {
              setFile(value.pop());
            }}
            className="mb-16"
          />
          <FileRenderer
            url={file as File}
            isUpdateOnChange
            onRemove={() => {
              setFile(undefined);
            }}
          />
          <Text size={24} className="my-12">
            Temp Url: {url || tempUrl}
          </Text>
          <Text size={24} className="my-12">
            Decode Url: {decodeUrl}
          </Text>
          {decodeUrl && (
            <Image
              src={decodeUrl}
              alt="Unset"
              width={240}
              height={240}
              style={{ objectFit: 'cover' }}
            />
          )}
        </Grid.Item>
        <Grid.Item>
          <Input label="Field 1" />
        </Grid.Item>
        <Grid.Item>
          <Input label="Field 2" iconName="ic_user" />
        </Grid.Item>
      </Grid.Wrap>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const mapStateToProps = (state: IRootState) => ({
  value: state.content.value,
  todoList: state.content.todoList,
  loading: state.content.loading,
  fileLoading: state.file.loading,
});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({
  onUploadFile: (payload: GetPresignedPayload) => dispatch(uploadFileAction(payload)),
  onGetDecodeUrl: (payload: { filePath: string | File; callback?: Callback | undefined }) =>
    dispatch(getDecodeUrlAction(payload)),
  onIncrementValue: () => dispatch(incrementValue()),
  onDecrementValue: () => dispatch(decrementValue()),
  onGetTodoList: () => dispatch(getTodoListAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
