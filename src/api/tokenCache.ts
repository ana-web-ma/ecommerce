import { type TokenStore, type TokenCache } from '@commercetools/sdk-client-v2';

let tokenStore: TokenStore = {
  expirationTime: 0,
  token: '',
};

export const tokenCache: TokenCache = {
  get: (): TokenStore => tokenStore,
  set: (newTokenStore) => {
    tokenStore = newTokenStore;
  },
};
