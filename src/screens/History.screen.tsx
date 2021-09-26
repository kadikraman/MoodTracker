import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAppContext } from '../App.provider';

export const History: React.FC = () => {
  const appContext = useAppContext();

  return (
    <View style={styles.container}>
      <Text>History</Text>
      <Text>{appContext.greeting}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
