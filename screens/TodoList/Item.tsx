import { View, Text } from 'react-native';
import { IProps } from './Form';

const TodoItem: React.FC<IProps> = ({ id, input }) => {
  return (
    <View>
      <Text>{id}</Text>
      <Text>{input}</Text>
    </View>
  );
};

export default TodoItem;
