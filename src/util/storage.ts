import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { IUser } from '../interfaces/IUser';

type token = {
  accessToken: string,
  refreshToken: string,
}

const USER = "user";
const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export const storeSignIn = async (newUser: IUser, token: token) => {
  try {
    const jsonValue = JSON.stringify(newUser);
    await AsyncStorage.setItem(USER, jsonValue);
    await SecureStore.setItemAsync(ACCESS_TOKEN, token.accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN, token.refreshToken);
  } catch (error) {
    console.error(error);
  }
}

export const storeRefresh = async (token: token) => {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN, token.accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN, token.refreshToken);
  } catch (error) {
    console.error(error);
  }
}

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER);
    const user = JSON.parse(jsonValue);
    if (user) return user;
  } catch (error) {
    console.error(error);
  }
}

export const getAccessToken = async () => {
  try {
    const result = await SecureStore.getItemAsync(ACCESS_TOKEN);
    if (result) return result;
  } catch (error) {
    console.error(error);
  }
}

export const getRefreshToken = async () => {
  try {
    const result = await SecureStore.getItemAsync(REFRESH_TOKEN);
    if (result) return result;
  } catch (error) {
    console.error(error);
  }
}

export const storeSignOut = async () => {
  try {
    await AsyncStorage.removeItem(USER);
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN);
  } catch (error) {
    console.error(error);
  }
}