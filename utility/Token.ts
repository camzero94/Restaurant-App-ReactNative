import * as SecureStore from 'expo-secure-store';

export async function setToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getToken(key: string) {
  let result = await SecureStore.getItemAsync(key);
  console.log('Token is ===>: ' + result);
  return result;
}
export async function deleteToken(key: string) {
  let result = await SecureStore.deleteItemAsync(key);
  // console.log('Token Deleted  is ===>: ' + result);
  return result;
}
