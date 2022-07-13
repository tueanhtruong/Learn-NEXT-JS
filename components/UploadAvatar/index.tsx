import type { NextPage } from 'next';
import { connect } from 'react-redux';
import { Button, Text, View } from '../../components/commons';
import { IRootState } from '../../redux/rootReducer';
import { Callback } from '../../redux/type';

const UploadModal: NextPage<Props> = ({ onSave }) => {
  return (
    <View className="medium-form-container">
      <Text>You can upload a JPG, GIF or PNG file. Maximum file size is 16 MB.</Text>
      <View isRow justify="flex-end" className="mt-16">
        <Button label="Cancel" variant="outline" className="mr-16" />
        <Button label="Save" />
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    onSave: Callback;
  };
const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = (dispatch: (arg0: { payload: any; type: string }) => any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);
