import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadString(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}

export async function saveString(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

// Please check before use

export async function load(key) {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    return JSON.parse(almostThere);
  } catch {
    return null;
  }
}

export async function save(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export async function remove(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

export async function clear() {
  try {
    await AsyncStorage.clear();
  } catch {}
}
