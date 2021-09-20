import AsyncStorage from '@react-native-async-storage/async-storage';

const tokenKey = 'accessToken';

export class AuthStorage {
  namespace: string;

  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:${tokenKey}`);
    return token ? token : [];
  }

  async setAccessToken(token: string) {
    if (token) {
      await AsyncStorage.setItem(`${this.namespace}:${tokenKey}`, token);
      console.log(`Set Accsess Token: ${token}`);
    } else {
      console.log('No Accsess Token.');
    }
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:${tokenKey}`);
  }
}
