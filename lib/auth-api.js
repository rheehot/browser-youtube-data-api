import { gapi } from 'gapi-script';

/**
 * * AuthAPI class with IIFE for private variable
 * @return instance of AuthAPI
 */
const AuthAPI = (function AuthAPI() {
  const _GoogleAuth = new WeakMap();

  class Auth {
    constructor() {
      _GoogleAuth.set(this, null);
    }

    /**
     * * SignIn with GoogleAuth instance
     * * [Asynchronous]
     */
    async signIn() {
      if (_GoogleAuth.get(this) === null) {
        throw new Error('GoogleAuth is null!');
      }
      await _GoogleAuth.get(this).signIn();
    }

    /**
     * * Check user is signed in with GoogleAuth instance
     * @return {boolean} sign flag
     */
    isSignedIn() {
      if (_GoogleAuth.get(this) === null) return false;
      return _GoogleAuth.get(this).isSignedIn.get();
    }

    /**
     * * Initialize GoogleAuth instance
     */
    init() {
      _GoogleAuth.set(this, gapi.auth2.getAuthInstance());
    }
  }
  return Auth;
}());

export default AuthAPI;
