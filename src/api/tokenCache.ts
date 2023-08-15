import { type TokenStore, type TokenCache } from '@commercetools/sdk-client-v2';
// import { tokenStore } from './tokenCache';

let tokenStore: TokenStore = {
  expirationTime: 0,
  token: 'pfBIX9biKLF91lyh-EVp8DbYDKPHYjLZ',
};

export const tokenCache: TokenCache = {
  get: (): TokenStore => {
    return tokenStore;
  },
  set: (newTokenStore) => {
    tokenStore = newTokenStore;
  },
};
