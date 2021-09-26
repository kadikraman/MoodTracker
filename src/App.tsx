import React from 'react';
import { StyleSheet, View } from 'react-native';

export const App: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
});
