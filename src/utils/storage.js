import AsyncStorage from "@react-native-async-storage/async-storage"

export const AsyncStorageGetItem = async (KEY) => await AsyncStorage.getItem(KEY).then((res) => JSON.parse(res));

export const AsyncStorageSetItem = async (KEY, VALUE) => await AsyncStorage.setItem(KEY,JSON.stringify(VALUE));

export const AsyncStorageRemoveItem = async (KEY) => await AsyncStorage.removeItem(KEY);

export const AsyncStorageClear = async () => await AsyncStorage.clear();