import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const TrainingScreen = () => {
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');

  const addExercise = () => {
    setExercises([...exercises, { name: exerciseName, key: Math.random().toString() }]);
    setExerciseName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhamento de Treino</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do exercício"
        value={exerciseName}
        onChangeText={setExerciseName}
      />
      <Button title="Adicionar exercício" onPress={addExercise} />
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default TrainingScreen;
