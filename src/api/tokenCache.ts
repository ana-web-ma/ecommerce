import { type TokenStore, type TokenCache } from '@commercetools/sdk-client-v2';
// import { tokenStore } from './tokenCache';

let tokenStore: TokenStore = {
  expirationTime: 0,
  token: '',
};

export const tokenCache: TokenCache = {
  get: (): TokenStore => {
    return tokenStore;
  },
  set: (newTokenStore) => {
    tokenStore = newTokenStore;
  },
};
