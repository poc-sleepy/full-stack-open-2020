import AsyncStorage from '@react-native-async-storage/async-storage';

const tokenKey = 'accessToken';

export class AuthStorage {
  namespace: string;

  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const rawToken = await AsyncStorage.getItem(
      `${this.namespace}:${tokenKey}`
    );

    return rawToken ? JSON.parse(rawToken) : [];
  }

  async setAccessToken(accessToken: any) {
    const token = accessToken.authorize.accessToken;

    if (token) {
      await AsyncStorage.setItem(
        `${this.namespace}:${tokenKey}`,
        accessToken.authorize.accessToken
      );
      console.log(`Set Accsess Token: ${token}`);
    } else {
      console.log('No Accsess Token.');
    }
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:products`);
  }
}
