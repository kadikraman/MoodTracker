import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MoodOptionType } from '../types';
import { theme } from '../theme';

const imageSrc = require('../../assets/butterflies.png');

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

type MoodPickerProps = {
  onSelect: (mood: MoodOptionType) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = React.useState(false);

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [onSelect, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              style={[
                styles.moodItem,
                option.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text style={styles.moodText}>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === option.emoji ? option.description : ' '}
            </Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.button} onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontSize: 10,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  container: {
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    height: 230,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  heading: {
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  image: {
    alignSelf: 'center',
  },
});
