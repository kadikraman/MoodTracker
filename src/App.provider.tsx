import React from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'my-app-data';

type AppData = {
  moods: MoodOptionWithTimestamp[];
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);

    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};

const setAppData = async (newData: AppData) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {}
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
  handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

const defaultValue = {
  moodList: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {},
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = React.useCallback((mood: MoodOptionType) => {
    setMoodList(current => {
      const newValue = [...current, { mood, timestamp: Date.now() }];
      setAppData({ moods: newValue });
      return newValue;
    });
  }, []);

  const handleDeleteMood = React.useCallback(
    (mood: MoodOptionWithTimestamp) => {
      setMoodList(current => {
        const newValue = current.filter(
          item => item.timestamp !== mood.timestamp,
        );
        setAppData({ moods: newValue });
        return newValue;
      });
    },
    [],
  );

  React.useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();

      if (data) {
        setMoodList(data.moods);
      }
    };
    getDataFromStorage();
  }, []);

  return (
    <AppContext.Provider
      value={{ moodList, handleSelectMood, handleDeleteMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
