import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { IUser } from '../interfaces/IUser';

export const storeLogin = async (newUser: IUser, token: string) => {
  try {
    const jsonValue = JSON.stringify(newUser);
    await AsyncStorage.setItem("user", jsonValue);
    await SecureStore.setItemAsync("accessToken", token);
  } catch (error) {
    console.error(error);
  }
}

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("user");
    const user = JSON.parse(jsonValue);
    if (user) return user;
  } catch (error) {
    console.error(error);
  }
}

export const getToken = async () => {
  try {
    const result = await SecureStore.getItemAsync("accessToken");
    if (result) return result;
  } catch (error) {
    console.error(error);
  }
}

export const deleteLogin = async () => {
  try {
    await AsyncStorage.setItem("user", "");
    await SecureStore.deleteItemAsync("accessToken");
  } catch (error) {
    console.error(error);
  }
}