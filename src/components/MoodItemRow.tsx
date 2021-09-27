import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import format from 'date-fns/format';
import { MoodOptionWithTimestamp } from '../types';
import { theme } from '../theme';
import { useAppContext } from '../App.provider';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  const appContext = useAppContext();

  return (
    <View style={styles.moodItem}>
      <View style={styles.iconAndDescription}>
        <Text style={styles.moodValue}>{item.mood.emoji}</Text>
        <Text style={styles.moodDescription}>{item.mood.description}</Text>
      </View>
      <Text style={styles.moodDate}>
        {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
      </Text>
      <Pressable hitSlop={16} onPress={() => appContext.handleDeleteMood(item)}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
    fontFamily: theme.fontFamilyRegular,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyBold,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: theme.colorBlue,
    fontFamily: theme.fontFamilyLight,
  },
});
