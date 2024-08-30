import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, user: string) => {
  try {
    await AsyncStorage.setItem(key, user);
  } catch (error) {
    console.error(error);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(error);
  }
};