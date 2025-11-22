import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem(key, defaultValue = null) {
  try {
    const json = await AsyncStorage.getItem(key);
    return json != null ? JSON.parse(json) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export async function setItem(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}