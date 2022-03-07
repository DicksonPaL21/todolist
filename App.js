import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import uuid from 'react-native-uuid';

// Components
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, { id: uuid.v4(), value: task }]);
    // setTaskItems([...taskItems, task]);
    setTask('');
  };

  const completeTask = (id) => {
    let itemCopy = [...taskItems];
    itemCopy = itemCopy.filter((_this) => _this.id !== id);
    console.log('itemCopy', itemCopy);
    setTaskItems(itemCopy);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {taskItems.map((t) => (
            <TouchableOpacity key={t.id} onPress={() => completeTask(t.id)}>
              <Task text={t.value} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          onChangeText={setTask}
          value={task}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7eaed',
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  addText: {},
});
