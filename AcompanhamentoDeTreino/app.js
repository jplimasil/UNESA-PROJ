// App.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@workouts');
      if (jsonValue != null) {
        setWorkouts(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveWorkout = async () => {
    const newWorkout = { id: Date.now().toString(), exercise, duration };
    const updatedWorkouts = [...workouts, newWorkout];

    try {
      await AsyncStorage.setItem('@workouts', JSON.stringify(updatedWorkouts));
      setWorkouts(updatedWorkouts);
      setExercise('');
      setDuration('');
    } catch (e) {
      console.error(e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.exerciseText}>{item.exercise}</Text>
      <Text style={styles.durationText}>{item.duration} min</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Acompanhamento de Treinos</Text>
      <TextInput
        style={styles.input}
        placeholder="Exercício"
        value={exercise}
        onChangeText={setExercise}
      />
      <TextInput
        style={styles.input}
        placeholder="Duração (min)"
        value={duration}
        keyboardType="numeric"
        onChangeText={setDuration}
      />
      <Button title="Adicionar Treino" onPress={saveWorkout} />
      <FlatList
        data={workouts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  exerciseText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  durationText: {
    fontSize: 16,
    color: '#666',
  },
});

export default App;
