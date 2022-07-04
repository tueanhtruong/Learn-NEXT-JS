import type { NextPage } from 'next';
import { Button, Grid, LoadingCommon, Text, View } from '../../components/commons';
import Input from '../../components/commons/Input';
import { connect } from 'react-redux';
import {
  decrementValue,
  getTodoListAction,
  incrementValue,
} from '../../redux/content/contentSlice';
import { IRootState } from '../../redux/rootReducer';

const Home: NextPage<Props> = ({
  value,
  todoList,
  loading,
  onIncrementValue,
  onDecrementValue,
  onGetTodoList,
}) => {
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
      </View>
      <Grid.Wrap>
        <Grid.Item variant="is-full">
          <Text size={24} className="my-12">
            Grid
          </Text>
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
});

const mapDispatchToProps = (dispatch: (arg0: { payload: undefined; type: string }) => any) => ({
  onIncrementValue: () => dispatch(incrementValue()),
  onDecrementValue: () => dispatch(decrementValue()),
  onGetTodoList: () => dispatch(getTodoListAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
