import { gapi } from 'gapi-script';
import AuthAPI from './auth-api';
import * as constants from './type-constants';
import methods from './methods';

/**
 * * Initialize gapi.client
 * * [Asynchronous]
 */
const initGapiClient = async (apiKey) => {
  try {
    await gapi.client.init({
      apiKey,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * * Initialize gapi.client to load gapi:auth2
 * * [Asynchronous]
 */
const initGapiClientWithAuth = async (clientId, scopes) => {
  await gapi.client.init({
    clientId,
    scope: scopes.join(' '),
  });
};

/**
 * * Make gapi.load() to return Promise object
 * @return Promise of result of gapi.load()
 */
const gapiLoadByPromise = (apiKey) => {
  return new Promise(resolve => {
    gapi.load('client', async () => {
      await initGapiClient(apiKey);
      resolve();
    });
  });
};

/**
 * * YoutubeAPI class with IIFE for private variable
 * @return instance of YoutubeAPI
 */
const YoutubeAPI = (function YoutubeAPI() {
  const _authAPI = new WeakMap();

  class Youtube {
    constructor() {
      _authAPI.set(this, new AuthAPI());
      // TODO: Exposure member variable and methods to user
      Object.keys(constants).forEach((key, index) => {
        this[constants[key]] = methods[index];
      });
    }

    /**
     * * Initialize Youtube API
     * * [Asynchronous]
     * @param {String} apiKey API key to use Youtube API
     */
    async init(apiKey) {
      await gapiLoadByPromise(apiKey);
    }

    /**
     * * Authenticate user
     * * [Asynchronous]
     * @param {String} clientId Client id to use OAuth2 API
     * @param {Array} scopes Scopes applying to use of Youtube API
     */
    async authenticate(clientId, scopes) {
      try {
        await initGapiClientWithAuth(clientId, scopes);
        _authAPI.get(this).init();
        await _authAPI.get(this).signIn();
      } catch (e) {
        throw new Error('Not authenticated!');
      }
    }

    /**
     * * Check user is authenticated
     */
    isAuthenticated() {
      return _authAPI.get(this).isSignedIn();
    }
  }
  return Youtube;
}());

export default YoutubeAPI;
