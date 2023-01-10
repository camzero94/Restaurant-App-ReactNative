import {
  GestureResponderEvent,
  NativeEventEmitter,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
import React, { useState, useRef } from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Button } from '@rneui/base';
import TodoList from './TodoList';

export interface IProps {
  id: number;
  input: string;
}

export default function Form() {
  const [input, setInput] = useState<string | null>(null);
  const [todos, setTodos] = useState<IProps[]>([]);
  const inputRef = useRef<TextInput | null>(null);
  const dummy = [
    { id: 1, input: 'hello' },
    { id: 2, input: 'hello1' },
  ];
  const addTodo = (newTodo: IProps) => {
    setTodos([newTodo, ...todos]);
    console.log(todos);
  };
  const onSubmit = (e: GestureResponderEvent) => {
    const todoTask = {
      id: Math.round(Math.random() * 10),
      input: input as string,
    };
    addTodo(todoTask);
    inputRef.current?.clear();
  };

  const onClear = () => {
    setTodos([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Enter your name '
        onChangeText={(newText) => {
          setInput(newText);
        }}
        ref={inputRef}
      />
      <View>
        <Button title={'Submit'} onPress={onSubmit} />
        <Button title={'Clear'} onPress={onClear}></Button>
      </View>
      <TodoList props={todos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
