import {AsyncStorage} from 'react-native';

export const setAsyncStorage = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // Error saving data
    console.log(`Failed setting data with error ${error}`);
  }
};

export const getAsyncStorage = async (key: string) => {
  let value = null;
  try {
    value = await AsyncStorage.getItem(key);
    if (value) value = JSON.parse(value);
  } catch (error) {
    // Error retrieving data
    console.log(`Failed getting data with error ${error}`);
  }

  return value;
};
