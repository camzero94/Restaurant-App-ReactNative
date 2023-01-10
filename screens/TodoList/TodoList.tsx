import React from 'react';
import { View, Text } from 'react-native';
import TodoItem from './Item';
import { IProps } from './Form';

export interface IPropsArr {
  props: IProps[];
}
const TodoList: React.FC<IPropsArr> = ({ props }) => {
  return (
    <View>
      {props.map((obj) => (
        <TodoItem key={obj.id} id={obj.id} input={obj.input} />
      ))}
    </View>
  );
};

export default TodoList;
