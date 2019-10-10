const SimpleCrypto = require('simple-crypto-js').default;

const simpleCrypto = new SimpleCrypto(process.env.REACT_APP_ENCRYPTION_SECRET);

class Tools {
  static AUTHORIZATION_TOKEN = 'token';

  static randomString(length = 6): string {
    return `${Math.random()}`.substr(2, length);
  }

  static generateToken(username: string, password: string): string {
    return btoa(username + ':' + password);
  }

  static setToken(username: string, password: string): void {
    sessionStorage.setItem(
      Tools.AUTHORIZATION_TOKEN,
      Tools.encrypt(Tools.generateToken(username, password))
    );
  }

  static encrypt(str: string | null): string {
    return str ? simpleCrypto.encrypt(str) : '';
  }

  static decrypt(str: string | null): string {
    return str ? simpleCrypto.decrypt(str) : '';
  }

  static clearToken(): void {
    sessionStorage.removeItem(Tools.AUTHORIZATION_TOKEN);
  }

  static getToken(): string | null {
    return Tools.decrypt(sessionStorage.getItem(Tools.AUTHORIZATION_TOKEN));
  }

  static isLoggedIn(): boolean {
    return !!Tools.getToken();
  }
}

export default Tools;
